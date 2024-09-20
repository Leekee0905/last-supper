import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { CustomOverlayMap, MapMarker, useMap } from 'react-kakao-maps-sdk';

const EventMarkerContainer = ({ position, content }) => {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);
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
        // onMouseOver={() => setIsVisible(true)}
        // onMouseOut={() => setIsVisible(false)}
      />
      {(isVisible || isOpen) && (
        <CustomOverlayMap position={{ lat: String(Number(position.lat) + 0.0002), lng: position.lng }}>
          <div className="flex flex-col bg-white">
            <button onClick={() => setIsOpen(false)}>닫기</button>
            <div>{content}</div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
};
export default EventMarkerContainer;
