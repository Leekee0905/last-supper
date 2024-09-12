import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import ModalItem from './components/modalItem'; 

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleSignup = () => {
    // 회원가입 처리
  };

  const handleCalculator = () => {
    // 전역일 계산기 처리
  };

  return (
    <div className="relative flex min-h-screen">
      {/* 사이드바 */}
      <aside className="fixed top-0 left-0 h-full w-[400px] bg-gray-100 shadow-md">
        <header className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center mr-5">
              <FiMenu className="text-2xl" />
              <span className="text-xs text-gray-500 mt-1">메뉴</span>
            </div>
            <div className="relative flex items-center w-full max-w-sm">
              <input
                type="text"
                placeholder="검색"
                className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-md focus:outline-none"
              />
              <span className="absolute right-0 pr-2">
                <FiSearch className="text-red-500" size={20} />
              </span>
            </div>
          </div>
        </header>
      </aside>

      {/* 모달 배경 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
      )}

      {/* 사이드 모달 */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-gray-100 shadow-md transform ${
          isModalOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={toggleModal}>
            <FiX className="text-2xl text-gray-600" />
          </button>
        </div>
        <header className="p-4">
          <div className="flex flex-col items-start space-y-4 pl-4">
            <ModalItem
              icon={isLoggedIn ? 'logout' : 'login'}
              text={isLoggedIn ? '로그아웃' : '로그인'}
              onClick={handleLoginLogout}
              isLoggedIn={isLoggedIn}
            />
            {!isLoggedIn && (
              <ModalItem
                icon="signup"
                text="회원가입"
                onClick={handleSignup}
              />
            )}
            <ModalItem
              icon="calculator"
              text="전역일 계산기"
              onClick={handleCalculator}
            />
          </div>
        </header>
      </div>

      {/* 콘텐츠 */}
      <main className={`flex-1 p-4 bg-gray-50 ${isModalOpen ? 'ml-[400px]' : ''}`}>
        <button
          onClick={toggleModal}
          className="absolute top-4 left-4 text-2xl"
        >
          <FiMenu />
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
