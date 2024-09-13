import { useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HamburgerMenu from './components/HamburgerMenu';
import LoginModal from '../pages/MainPage/components/Login/LoginModal';

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

    setSearchParams({ query: searchInput });
  };

  return (
    <div className="relative flex min-h-screen">
      <Sidebar
        toggleModal={toggleModal}
        handleSearch={handleSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <HamburgerMenu
        hasModalOpen={hasModalOpen}
        toggleModal={toggleModal}
        hasLoggedIn={hasLoggedIn}
        handleLoginLogout={handleLoginLogout}
        handleSignup={handleSignup}
        setIsModalOpen={setIsModalOpen}
        handleCalculator={handleCalculator}
      />
      <main className="flex-1 p-4 bg-gray-50 ml-[400px]">
        <Outlet />
      </main>
      <LoginModal setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Layout;
