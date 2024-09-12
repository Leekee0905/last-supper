import { useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import ModalItem from './components/modalItem';

const Layout = () => {
  const [hasModalOpen, setIsModalOpen] = useState(false);
  const [hasLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleModal = () => {
    setIsModalOpen(!hasModalOpen);
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(!hasLoggedIn);
  };

  const handleSignup = () => {
    // 회원가입 처리
  };

  const handleCalculator = () => {
    // 전역일 계산기 처리
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;

    // 쿼리스트링에 검색어 추가
    setSearchParams({ query: searchInput });
  };

  return (
    <div className="relative flex min-h-screen">
      {/* 사이드바 */}
      <aside className="fixed top-0 left-0 h-full w-[400px] bg-gray-100 shadow-md">
        <div className="sticky top-0 bg-gray-100 z-10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center mr-5">
              <FiMenu className="text-2xl cursor-pointer" onClick={toggleModal} />
              <span className="text-xs text-gray-500 mt-1">메뉴</span>
            </div>
            <div className="relative flex items-center w-full max-w-sm">
              <form onSubmit={handleSearch} className="flex w-full">
                <input
                  type="text"
                  placeholder="검색"
                  className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-md focus:outline-none"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 pr-3 bottom-3"
                >
                  <FiSearch className="text-gray-500" size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 예시 콘텐츠 */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-72px)]">
          {Array.from({ length: 30 }, (_, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-md">
              <h2 className="text-lg font-semibold">콘텐츠 {index + 1}</h2>
              <p>이곳에 내용이 들어갑니다. 여기에 실제 콘텐츠를 추가할 수 있습니다.</p>
            </div>
          ))}
        </div>
      </aside>

      {/* 모달 배경 */}
      {hasModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
      )}

      {/* 사이드 모달 */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-gray-100 shadow-md transform ${hasModalOpen ? 'translate-x-0' : '-translate-x-full'
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
              icon={hasLoggedIn ? 'logout' : 'login'}
              text={hasLoggedIn ? '로그아웃' : '로그인'}
              onClick={handleLoginLogout}
              isLoggedIn={hasLoggedIn}
            />
            {!hasLoggedIn && (
              <ModalItem icon="signup" text="회원가입" onClick={handleSignup} />
            )}
            <ModalItem
              icon="calculator"
              text="전역일 계산기"
              onClick={handleCalculator}
            />
            {hasLoggedIn && (
              <ModalItem
                icon="bookmark"
                text="즐겨찾기"
                onClick={() => {
                  // 즐겨찾기 로직 처리
                }}
              />
            )}
          </div>
        </header>
      </div>

      {/* 콘텐츠 */}
      <main className="flex-1 p-4 bg-gray-50 ml-[400px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;