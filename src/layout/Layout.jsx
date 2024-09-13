import { useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HamburgerMenu from './components/HamburgerMenu';
import useModalStore from '../store/useModalStore';
import Calculator from '../pages/MainPage/components/Calculator';
import Modal from '../pages/MainPage/components/Modal/Modal';
import LoginModal from '../pages/MainPage/components/Login/LoginModal';

const Layout = () => {
<<<<<<< HEAD

  const { hasSidebarOpen: hasOpen, setHasSidebarOpen: setHasOpen, hasCalculatorOpen, setHasCalculatorOpen } = useModalStore((state) => ({
    hasSidebarOpen: state.hasOpen,
    setHasSidebarOpen: state.setHasOpen,
    hasCalculatorOpen: state.hasCalculatorOpen,
    setHasCalculatorOpen: state.setHasCalculatorOpen,
  }));

=======
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);
  const setModalType = useModalStore((state) => state.setModalType);
  const modalType = useModalStore((state) => state.modalType);
>>>>>>> 314559340594f5a87d151b76d3f57821c575282b
  const [hasModalOpen, setIsModalOpen] = useState(false);
  const [hasLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleModal = () => {
    setIsModalOpen(!hasModalOpen);
  };

  const handleCalculator = () => {
<<<<<<< HEAD
    setHasCalculatorOpen(true);
    if (hasOpen) {
      setHasOpen(false);
    }
=======
    setHasModalOpen(true);
    setModalType('calculator');
>>>>>>> 314559340594f5a87d151b76d3f57821c575282b
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;

    setSearchParams({ query: searchInput });
  };

  const renderModalType = () => {
    switch (modalType) {
      case 'calculator': {
        return <Calculator />;
      }
      case 'login':
        return <LoginModal />;
    }
  };

  return (
    <div className="relative flex min-h-screen">
<<<<<<< HEAD
      <Modal>
        {hasCalculatorOpen && <Calculator />}
      </Modal>

=======
      {/* <Calculator /> */}
      <LoginModal setIsModalOpen={setIsModalOpen} />
>>>>>>> 314559340594f5a87d151b76d3f57821c575282b
      <Sidebar
        toggleModal={toggleModal}
        handleSearch={handleSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <HamburgerMenu
        hasModalOpen={hasModalOpen}
        toggleModal={toggleModal}
<<<<<<< HEAD
        // hasLoggedIn={hasLoggedIn}
        // handleLoginLogout={handleLoginLogout}
        // handleSignup={handleSignup}
        handleCalculator={handleCalculator}
=======
        setIsModalOpen={setIsModalOpen}
        // handleCalculator={handleCalculator}
>>>>>>> 314559340594f5a87d151b76d3f57821c575282b
      />
      <main className="flex-1 p-4 bg-gray-50 ml-[400px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
