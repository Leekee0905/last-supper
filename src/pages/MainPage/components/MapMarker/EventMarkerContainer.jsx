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
        onClick={(marker) => handleMarkerInfo(marker)}
        image={{ src: '/assets/markerLine2.png', size: { width: 70, height: 70 } }}
      />
      {isClicked && (
        <CustomOverlayMap position={position}>
          <div className="relative bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col items-center min-w-[350px] p-6 -mt-60 transition-transform duration-300 ease-in-out transform hover:scale-105">
            <div className="flex w-full justify-between items-center mb-3">
              <h1 className="font-bold text-2xl text-gray-800">{content.place_name}</h1>
              <button onClick={() => setSelectedMarker(null)} className="text-gray-600 hover:text-gray-800 transition">
                <FiX className="w-[20px] h-[20px]" />
              </button>
            </div>
            <div className="flex flex-col w-full justify-center items-start gap-1">
              <p className="text-xs text-gray-600">{content.category_name}</p>
              <p className="text-sm text-gray-700">{content.address_name}</p>
              <p className="text-sm">
                <a className={`text-blue-600 hover:underline hover:text-blue-800 transition`} href={content.place_url} target="_blank" rel="noopener noreferrer">
                  가게 상세정보
                </a>
              </p>
            </div>
            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
};

export default EventMarkerContainer;
