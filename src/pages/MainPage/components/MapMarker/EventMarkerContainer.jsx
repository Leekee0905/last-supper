import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { CustomOverlayMap, MapMarker, useMap } from 'react-kakao-maps-sdk';

const EventMarkerContainer = ({ position, content, isClicked, index, setSelectedMarker }) => {
  const map = useMap();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleMarkerInfo = (marker) => {
    map.panTo(marker.getPosition());
    setSelectedMarker(index);
  };

  return (
    <>
    {isOverlayOpen && (
      <CustomOverlayMap position={position}> 
        <div className="relative bg-white bg-opacity-90 border border-gray-200 rounded-lg shadow-lg flex flex-col items-center min-w-[320px] p-4"
             style={{ marginTop:"-220px" }}> 
          <div className="flex w-full justify-between items-center mb-3">
            <h1 className="font-semibold text-xl">{content.place_name}</h1>
            <button onClick={() => setIsOverlayOpen(false)} className="text-gray-600 hover:text-gray-800 transition">
              <FiX className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center text-center text-gray-900">
            <p className="text-sm text-gray-500">{content.category_name}</p>
            <p className="text-sm text-gray-600">{content.address_name}</p>
            <p className="text-sm">
              <a
                className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                href={content.place_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                가게 상세정보
              </a>
            </p>
          </div>
          <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
        </div>
      </CustomOverlayMap>
    )}
      <MapMarker
        position={position}
        clickable={true}
        onClick={handleMarkerInfo}
        image={{ src: '/assets/markerLine2.png', size: { width: 70, height: 70 } }}
      />
    </>
  );
};

export default EventMarkerContainer;
