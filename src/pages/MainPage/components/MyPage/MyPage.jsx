import { useState } from 'react';
import useModalStore from '../../../../store/useModalStore';
import Modal from '../Modal/Modal';
import Profile from './Profile';
import MyActivities from './MyActivities';
// import Favorites from './Favorites';
// import MyReviews from './MyReviews';

const MY_PAGE_NAV = { profile: 'profile', favorites: 'favorites', myReviews: 'myReviews' };

const MyPage = () => {
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);
  const [activeNav, setActiveNav] = useState(MY_PAGE_NAV.profile);

  const activeSideBtn = () => {
    switch (activeNav) {
      case MY_PAGE_NAV.profile:
        return <Profile />;
      case MY_PAGE_NAV.favorites:
        return <MyActivities favorites={true} />;
      case MY_PAGE_NAV.myReviews:
        return <MyActivities />;
      default:
        throw new Error('잘못된 버튼을 클릭하였습니다.');
    }
  };

  return (
    <Modal>
      <div className="flex flex-row">
        <aside className="flex flex-col">
          <h2>마이페이지</h2>
          <nav
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.profile);
            }}
          >
            개인 정보
          </nav>
          <nav
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.favorites);
            }}
          >
            즐겨찾기
          </nav>
          <nav
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.myReviews);
            }}
          >
            내 리뷰
          </nav>
        </aside>
        <section>{activeSideBtn()}</section>
        <button onClick={setHasModalOpen}>X</button>
      </div>
    </Modal>
  );
};

export default MyPage;
