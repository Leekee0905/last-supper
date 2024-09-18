import useModalStore from '../../../../store/useModalStore';
import useRestaurantsStore from '../../../../store/useRestaurantsInfo';
import { FiX } from 'react-icons/fi';
import useUserStore from '../../../../store/useUserStore';

const DetailModal = ({ detailInfo }) => {
  const { setIsOpen } = useRestaurantsStore((state) => state);
  const { user, hasAuthenticated } = useUserStore((state) => state);
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
        borderRadius: '12PX'
      }}
    >
      <div style={{ textAlign: 'right' }}>
        <button onClick={() => setIsOpen(false)} style={{ fontSize: '20px' }}>
          <FiX />
        </button>
      </div>
      <div style={{ lineHeight: '32px', marginBottom: '20px' }}>
        <p style={{ fontWeight: '900', fontSize: '28px' }}>{detailInfo.place_name}</p>
        <p style={{ fontSize: '13px', opacity: '0.5' }}>{subContent}</p>
        <p>주소: {detailInfo.address_name}</p>
        <p>전화번호: {detailInfo.phone}</p>
      </div>
      <div>
        <div>
          <input type="text" />
          <button>추가</button>
        </div>
        <div>Post</div>
      </div>
    </div>
  );
};

export default DetailModal;
