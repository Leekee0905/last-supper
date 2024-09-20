import { FiX } from 'react-icons/fi';
import Review from './Review';
import Favorite from './Favorite';
import useRestaurantsStore from '../../../../store/useRestaurantsInfo';

const DetailModal = ({ detailInfo }) => {
  const { setIsOpen } = useRestaurantsStore((state) => state);
  const subContent = detailInfo.category_name.split('').slice(6).join('');

  return (
    <div
      style={{
        zIndex: '40',
        position: 'absolute',
        backgroundColor: '#d2caca',
        width: '25%',
        height: '83%',
        left: '27%',
        padding: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: '12PX',
        overflowY: 'scroll'
      }}
    >
      <div style={{ textAlign: 'right' }}>
        <button onClick={() => setIsOpen(false)} style={{ fontSize: '20px' }}>
          <FiX />
        </button>
      </div>
      <div style={{ lineHeight: '32px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontWeight: '900', fontSize: '28px', marginRight: '10px' }}>{detailInfo.place_name}</p>
          <Favorite detailInfo={detailInfo} />
        </div>
        <p style={{ fontSize: '13px', opacity: '0.5' }}>{subContent}</p>
        <p>주소: {detailInfo.address_name}</p>
        <p>전화번호: {detailInfo.phone}</p>
      </div>
      <Review detailInfo={detailInfo} />
    </div>
  );
};

export default DetailModal;
