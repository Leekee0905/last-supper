import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HamburgerMenu from './components/HamburgerMenu';
import useModalStore from '../store/useModalStore';
import Calculator from '../pages/MainPage/components/Calculator/Calculator';
import Modal from '../pages/MainPage/components/Modal/Modal';
import LoginModal from '../pages/MainPage/components/Login/LoginModal';
import { useHasTokenAuthenticatedQuery } from '../hooks/queries/auth/useHasTokenAuthenticatedQuery';
import useUserStore from '../store/useUserStore';
import MyPage from '../pages/MainPage/components/MyPage/MyPage';
import SignupModal from '../pages/MainPage/components/Signup/SignupModal';

const Layout = () => {
  const modalType = useModalStore((state) => state.modalType);
  const [hasModalOpen, setIsModalOpen] = useState(false);
  const setHasAuthenticated = useUserStore((state) => state.setHasAuthenticated);

  const { data: hasAuthenticated, isPending, isError, error } = useHasTokenAuthenticatedQuery();

  const toggleModal = () => {
    setIsModalOpen(!hasModalOpen);
  };

  const renderModalType = () => {
    switch (modalType) {
      case 'calculator':
        return <Calculator />;
      case 'login':
        return <LoginModal />;
      case 'signup':
        return <SignupModal />;
      case 'mypage':
        return <MyPage />;
    }
  };

  const resetTokenAuthenticatedAndUserInfo = () => {
    alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
    useUserStore.setState({ user: { accessToekn: '', avatar: null, nickname: '', success: false, userId: '' } });
    setHasAuthenticated(false);
  };

  useEffect(() => {
    if (isError) {
      resetTokenAuthenticatedAndUserInfo();
    }
  }, [isError]);

  return (
    <div className="relative flex min-h-screen">
      <Modal>{renderModalType()}</Modal>
      <Sidebar toggleModal={toggleModal} />
      <HamburgerMenu hasModalOpen={hasModalOpen} toggleModal={toggleModal} setIsModalOpen={setIsModalOpen} />
      <main className="flex-1 bg-gray-50 ml-[400px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
