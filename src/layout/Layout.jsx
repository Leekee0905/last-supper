import { useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HamburgerMenu from './components/HamburgerMenu';
import useModalStore from '../store/useModalStore';
import Calculator from '../pages/MainPage/components/Calculator';
import Modal from '../pages/MainPage/components/Modal/Modal';

const Layout = () => {

  const { hasSidebarOpen: hasOpen, setHasSidebarOpen: setHasOpen, hasCalculatorOpen, setHasCalculatorOpen } = useModalStore((state) => ({
    hasSidebarOpen: state.hasOpen,
    setHasSidebarOpen: state.setHasOpen,
    hasCalculatorOpen: state.hasCalculatorOpen,
    setHasCalculatorOpen: state.setHasCalculatorOpen,
  }));

  const [hasModalOpen, setIsModalOpen] = useState(false);
  const [hasLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleModal = () => {
    setIsModalOpen(!hasModalOpen);
  };

  const handleCalculator = () => {
    setHasCalculatorOpen(true);
    if (hasOpen) {
      setHasOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;

    setSearchParams({ query: searchInput });
  };

  return (
    <div className="relative flex min-h-screen">
      <Modal>
        {hasCalculatorOpen && <Calculator />}
      </Modal>

      <Sidebar
        toggleModal={toggleModal}
        handleSearch={handleSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <HamburgerMenu
        hasModalOpen={hasModalOpen}
        toggleModal={toggleModal}
        // hasLoggedIn={hasLoggedIn}
        // handleLoginLogout={handleLoginLogout}
        // handleSignup={handleSignup}
        handleCalculator={handleCalculator}
      />
      <main className="flex-1 p-4 bg-gray-50 ml-[400px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
