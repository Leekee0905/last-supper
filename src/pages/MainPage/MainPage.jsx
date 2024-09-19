import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Map } from 'react-kakao-maps-sdk';
import EventMarkerContainer from './components/MapMarker/EventMarkerContainer';
import { campSearchWordConverter } from '../../utils/campSearchWordConverter';
import useRestaurantsStore from '../../store/useRestaurantsInfo';
import { useSaveRestaurantsDataQuery } from '../../hooks/queries/restaurants/useSaveRestaurantsDataQuery';
import DetailModal from './components/Detail/DetailModal';

const MainPage = () => {
  const [param] = useSearchParams();
  const paramId = param.get('query');
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const setRestaurantsInfo = useRestaurantsStore((state) => state.setInfo);

  const { mutate: saveRestaurantsData } = useSaveRestaurantsDataQuery();

  const places = new window.kakao.maps.services.Places();

  const keywordSearch = () => {
    if (!map) return;
    places.keywordSearch(campSearchWordConverter(paramId), (data, status, _pagination) => {
      // console.log(data, '키워드 data');
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        let markers = [];
        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x
            },
            content: data[i].place_name
          });
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
        map.setLevel(4);
        searchRestaurants(map.getBounds());
      }
    });
  };

  const getPlacesPositionForMarkers = (data) => {
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      temp.push(data[i]);
    }
    let addedReviewsAndBookMarks = temp.map((e) => {
      return { ...e, reviews: [], bookmark: 0 };
    });
    // console.log(addedReviewsAndBookMarks, '음식점 data');
    setMarkers(temp);
    setRestaurantsInfo(temp);
    // saveRestaurantsData({ [paramId]: addedReviewsAndBookMarks });
  };

  const searchRestaurants = (bounds) => {
    places.categorySearch('FD6', getPlacesPositionForMarkers, {
      bounds: bounds,
      useMapBounds: true
    });
  };

  useEffect(() => {
    keywordSearch();
  }, [paramId, map]);

  return (
    <Map
      center={{
        lat: 37.566826,
        lng: 126.9786567
      }}
      style={{
        width: '100%',
        height: '100%'
      }}
      level={5}
      onCreate={setMap}
    >
      {markers.map((marker) => {
        return (
          <EventMarkerContainer
            key={marker.id}
            position={{ lat: marker.y, lng: marker.x }}
            content={marker.place_name}
          />
        );
      })}
    </Map>
  );
};

export default MainPage;
