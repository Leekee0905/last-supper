import { useEffect } from 'react';

const MainPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };

        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }, []);
  return <div id="map" style={{ width: 'clac(100% - 400px)', height: '100%' }}></div>;
};

export default MainPage;
