import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const MainPage = () => {
  const [param] = useSearchParams();
  const paramId = param.get('query');

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_KAKAO_API_KEY
  }&libraries=services,clusterer,drawing&autoload=false`;
  document.head.appendChild(script);

  script.onload = () => {
    window.kakao.maps.load(() => {
      // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
      let infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 4
      };

      const map = new window.kakao.maps.Map(container, options);

      // 장소 검색 객체를 생성합니다
      let ps = new window.kakao.maps.services.Places();

      // 키워드로 장소를 검색합니다
      ps.keywordSearch(paramId, placesSearchCB);

      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        if (status === window.kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          var bounds = new window.kakao.maps.LatLngBounds();

          for (var i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
          // 지도 레벨 변경
          map.setLevel(3);
        }
      }

      // 지도에 마커를 표시하는 함수입니다
      function displayMarker(place) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(place.y, place.x)
        });

        // 마커에 클릭이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          infowindow.open(map, marker);
        });
      }
    });
  };

  return <div id="map" style={{ width: 'clac(100% - 400px)', height: '100%' }}></div>;
};

export default MainPage;
