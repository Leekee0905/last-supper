import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { CustomOverlayMap, MapMarker, useMap } from 'react-kakao-maps-sdk';

const EventMarkerContainer = ({ position, content }) => {
  const map = useMap();
  const [isOpen, setIsOpen] = useState(false);
  const handleMarkerInfo = (marker) => {
    map.panTo(marker.getPosition());
    setIsOpen(true);
  };

  return (
    <>
      <MapMarker
        position={position}
        clickable={true}
        onClick={(marker) => handleMarkerInfo(marker)}
        image={{ src: '/assets/markerLine2.png', size: { width: 70, height: 70 } }}
      />
      {isOpen && (
        <CustomOverlayMap position={{ lat: String(Number(position.lat) + 0.0002), lng: position.lng }}>
          <div className="bg-white flex flex-col items-center w-[300px] h-[200px] p-5 rounded-lg">
            <div className="flex flex-col w-full items-end">
              <button onClick={() => setIsOpen(false)}>
                <FiX className="w-[20px] h-[20px]" />
              </button>
            </div>
            <div className="w-full h-full">
              <p>{content.place_name}</p>
              <p>{content.address_name}</p>
              <p>{content.category_name}</p>
              <p>{content.place_url}</p>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
};
export default EventMarkerContainer;
