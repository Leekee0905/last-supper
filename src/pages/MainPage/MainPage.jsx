import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const MainPage = () => {
  const [param] = useSearchParams();
  const paramId = param.get('query');

  useEffect(() => {
    // 스크립트 동적 생성
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_API_KEY
    }&libraries=services,clusterer,drawing&autoload=false`;

    document.head.appendChild(script);

    // 스크립트 로드된 후 실행
    script.onload = () => {
      window.kakao.maps.load(() => {
        // 마커를 클릭하면 장소명을 표출할 인포윈도우
        let infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        // 지도 표시
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 4
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);

        // 장소 검색 객체를 생성
        let ps = new window.kakao.maps.services.Places();

        // 키워드로 장소를 검색
        ps.keywordSearch(paramId, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            let bounds = new window.kakao.maps.LatLngBounds();

            for (let i = 0; i < data.length; i++) {
              displayCenter(data[i]);
              bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }

            map.setBounds(bounds);
            map.setLevel(3);

            searchRestaurants(map.getBounds());
          }
        });

        const searchRestaurants = (bounds) => {
          ps.categorySearch('FD6', placesSearchCB, {
            bounds: bounds,
            useMapBounds: true
          });
        };

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i]);
            }
          }
        }

        // 지도에 음식점 마커를 표시하는 함수
        function displayMarker(place) {
          // 마커를 생성하고 지도에 표시
          let marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(place.y, place.x)
          });

          // 마커에 클릭이벤트를 등록
          window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
          });

          window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
          });
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayCenter(place) {
          // 마커 이미지 생성
          const imageSrc = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png'; // 마커 이미지 URL
          const imageSize = new window.kakao.maps.Size(40, 40); // 마커 이미지 크기
          const imageOption = { offset: new window.kakao.maps.Point(20, 40) }; // 이미지 중심 좌표

          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          // 마커를 생성하고 지도에 표시
          let centerMarker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
            image: markerImage // 마커 이미지 설정
          });

          // 마커에 클릭이벤트를 등록
          window.kakao.maps.event.addListener(centerMarker, 'mouseover', function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, centerMarker);
          });

          window.kakao.maps.event.addListener(centerMarker, 'mouseout', function () {
            infowindow.close();
          });
        }
      });
    };
  }, [paramId]);

  return <div id="map" style={{ width: 'clac(100% - 400px)', height: '100%' }}></div>;
};

export default MainPage;
