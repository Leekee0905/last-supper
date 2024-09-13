import { FiX } from 'react-icons/fi';
import ModalItem from './HamburgerItem';

const HamburgerMenu = ({ hasModalOpen, toggleModal, hasLoggedIn, handleLoginLogout, handleSignup, handleCalculator }) => {
  return (
    <>
      {hasModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40"></div>
      )}
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
        <ModalContent
          hasLoggedIn={hasLoggedIn}
          handleLoginLogout={handleLoginLogout}
          handleSignup={handleSignup}
          handleCalculator={handleCalculator}
        />
      </div>
    </>
  );
};

const ModalContent = ({ hasLoggedIn, handleLoginLogout, handleSignup, handleCalculator }) => (
  <header className="p-4">
    <div className="flex flex-col items-start space-y-4 pl-4">
      <HambergerItem
        icon={hasLoggedIn ? 'logout' : 'login'}
        text={hasLoggedIn ? '로그아웃' : '로그인'}
        onClick={handleLoginLogout}
        isLoggedIn={hasLoggedIn}
      />
      {!hasLoggedIn && <HambergerItem icon="signup" text="회원가입" onClick={handleSignup} />}
      {hasLoggedIn && <HambergerItem icon="bookmark" text="마이페이지" onClick={openMyPageModal} />}
      <HambergerItem icon="calculator" text="전역일 계산기" onClick={handleCalculator} />
    </div>
  </header>
);

export default HamburgerMenu;
