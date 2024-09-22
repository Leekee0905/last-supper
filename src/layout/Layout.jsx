import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
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
import DetailModal from '../pages/MainPage/components/Detail/DetailModal';
import useRestaurantsStore from '../store/useRestaurantsInfo';

const Layout = () => {
  const [detailInfo, setDetailInfo] = useState([]);
  const modalType = useModalStore((state) => state.modalType);
  const setHasAuthenticated = useUserStore((state) => state.setHasAuthenticated);
  // NOTE 이름 명확하게?
  const setHasOpenModal = useModalStore((state) => state.setHasOpen);
  // NOTE isOpen 이름만 바꾸기
  const { isOpen } = useRestaurantsStore((state) => state);
  const { isError } = useHasTokenAuthenticatedQuery();

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
    setHasOpenModal(false);
  };

  useEffect(() => {
    if (isError) {
      resetTokenAuthenticatedAndUserInfo();
    }
  }, [isError]);

  return (
    <div className="relative flex min-h-screen">
      <Modal>{renderModalType()}</Modal>
      <Sidebar setDetailInfo={setDetailInfo} />
      <HamburgerMenu />
      <main className="flex-1 ml-[400px]">
        <Outlet />
      </main>
      {isOpen ? <DetailModal detailInfo={detailInfo} /> : ''}
    </div>
  );
};

export default Layout;
