import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { CustomOverlayMap, MapMarker, useMap } from 'react-kakao-maps-sdk';

const EventMarkerContainer = ({ position, content, isClicked, index, setSelectedMarker }) => {
  const map = useMap();
  const handleMarkerInfo = (marker) => {
    map.panTo(marker.getPosition());
    setSelectedMarker(index);
  };

  return (
    <>
      <MapMarker
        position={position}
        clickable={true}
        onClick={handleMarkerInfo}
        image={{ src: '/assets/markerLine2.png', size: { width: 70, height: 70 } }}
      />
      {isClicked && (
        <CustomOverlayMap position={{ lat: String(Number(position.lat) + 0.0002), lng: position.lng }}>
          <div className="bg-white flex flex-col items-center min-w-[350px] h-[200px] p-5 rounded-lg">
            <div className="flex flex-col w-full items-end">
              <button onClick={() => setSelectedMarker(null)}>
                <FiX className="w-[20px] h-[20px]" />
              </button>
            </div>
            <div className="w-full h-full flex flex-col justify-center gap-3 whitespace-nowrap">
              <h1 className="font-bold text-2xl">{content.place_name}</h1>
              <p className="text-xs text-gray-500">{content.category_name}</p>
              <p>{content.address_name}</p>
              <p className="text-sm">
                URL:{' '}
                <a className={`hover:underline hover:font-bold`} href={content.place_url}>
                  {content.place_url}
                </a>
              </p>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
};
export default EventMarkerContainer;
