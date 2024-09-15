import { FiX } from 'react-icons/fi';
import HamburgerItem from './HamburgerItem';
import useUserStore from '../../store/useUserStore';

const HamburgerMenu = ({ hasModalOpen, toggleModal, setIsModalOpen }) => {
  return (
    <>
      {hasModalOpen && <div className="fixed inset-0 bg-black bg-opacity-40"></div>}

      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-gray-100 shadow-md transform ${
          hasModalOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={toggleModal}>
            <FiX className="text-2xl text-gray-600" />
          </button>
        </div>
        <HamburgerContent setIsModalOpen={setIsModalOpen} />
      </div>
    </>
  );
};

const HamburgerContent = ({ setIsModalOpen }) => {
  const hasLoggedIn = useUserStore((state) => state.hasAuthenticated);
  return (
    <header className="p-4">
      <div className="flex flex-col items-start space-y-4 pl-4">
        {hasLoggedIn ? (
          <>
            <HamburgerItem icon={'mypage'} text={'마이페이지'} setIsModalOpen={setIsModalOpen} />
            <HamburgerItem icon="logout" text="로그아웃" setIsModalOpen={setIsModalOpen} />
          </>
        ) : (
          <>
            <HamburgerItem icon={'login'} text={'로그인'} setIsModalOpen={setIsModalOpen} />
            <HamburgerItem icon="signup" text="회원가입" />
          </>
        )}

        {/* {hasLoggedIn && (
          <HamburgerItem
            icon="bookmark"
            text="즐겨찾기"
            onClick={() => {
              // 즐겨찾기 로직 처리
            }}
          />
        )}
        <HamburgerItem icon="calculator" text="전역일 계산기" onClick={handleCalculator} /> */}
      </div>
    </header>
  );
};

export default HamburgerMenu;
