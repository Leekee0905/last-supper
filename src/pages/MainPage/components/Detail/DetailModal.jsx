import { FiX } from 'react-icons/fi';
import Review from './Review';
import Favorite from './Favorite';
import useRestaurantsStore from '../../../../store/useRestaurantsInfo';

const DetailModal = ({ detailInfo }) => {
  const { setIsOpen } = useRestaurantsStore((state) => state);
  const subContent = detailInfo.category_name.split('').slice(6).join('');

  return (
    <div className="z-40 absolute bg-[#536349] w-[28%] h-full left-[27%] p-[20px] top-[50%] translate-y-[-50%] overflow-auto">
      <div className="text-right">
        <button onClick={() => setIsOpen(false)} className="text-[30px]">
          <FiX />
        </button>
      </div>
      <div className="leading-[32px] text-white">
        <div className="flex items-center">
          <p className="font-black text-[36px] mr-[10px] leading-[50px]">{detailInfo.place_name}</p>
          <Favorite detailInfo={detailInfo} />
        </div>
        <p className="text-[13px] opacity-50">{subContent}</p>
        <p>주소: {detailInfo.address_name}</p>
        <p>전화번호: {detailInfo.phone}</p>
      </div>
      <Review detailInfo={detailInfo} />
    </div>
  );
};

export default DetailModal;
