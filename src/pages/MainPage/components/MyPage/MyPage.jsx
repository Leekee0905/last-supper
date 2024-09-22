import { useState } from 'react';
import Profile from './Profile';
import MyActivities from './MyActivities';
import { useMyActivitiesPrefetchQuery } from '../../../../hooks/queries/myActivities/myActivityQuery';
import { FAVORITES_QUERY_KEY, REVIEWS_QUERY_KEY } from '../../../../hooks/queries/queryKeys';
import useUserStore from '../../../../store/useUserStore';

// NOTE 상수로 빼자
const MY_PAGE_NAV = { profile: 'profile', favorites: 'favorites', myReviews: 'myReviews' };

const MyPage = () => {
  const { userId } = useUserStore((state) => state);

  // prefetch 함수
  const prefetchMyActivities = useMyActivitiesPrefetchQuery(userId);

  // 사이드 네비를 클릭하면 불러올 컴포넌트
  const [activeNav, setActiveNav] = useState(MY_PAGE_NAV.profile);

  const activeSideBtn = () => {
    switch (activeNav) {
      case MY_PAGE_NAV.profile:
        return <Profile />;
      case MY_PAGE_NAV.favorites:
        return <MyActivities queryKey={FAVORITES_QUERY_KEY} />;
      case MY_PAGE_NAV.myReviews:
        return <MyActivities queryKey={REVIEWS_QUERY_KEY} />;
      default:
        throw new Error('잘못된 요청을 하셨습니다.');
    }
  };

  return (
    <>
      <div className="flex flex-row w-[77vw] h-[70vh] mr-[3vw]">
        <aside className="flex flex-col w-[200px] gap-6">
          <h2 className="mb-4">마이페이지</h2>
          {/* NOTE css className 묶어버리자*/}
          <nav
            className={`my-page-nav ${activeNav === MY_PAGE_NAV.profile && 'my-page-nav-active'}`}
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.profile);
            }}
          >
            <span>개인 정보</span>
          </nav>
          <nav
            className={`my-page-nav ${activeNav === MY_PAGE_NAV.favorites && 'my-page-nav-active'}`}
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.favorites);
            }}
            onMouseEnter={() => prefetchMyActivities(FAVORITES_QUERY_KEY)}
          >
            <span>즐겨찾기</span>
          </nav>
          <nav
            className={`my-page-nav ${activeNav === MY_PAGE_NAV.myReviews && 'my-page-nav-active'}`}
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.myReviews);
            }}
            onMouseEnter={() => prefetchMyActivities(REVIEWS_QUERY_KEY)}
          >
            <span>내 리뷰</span>
          </nav>
        </aside>
        <section className="flex shadow-xl flex-col gap-2 grow border rounded py-5 px-6 bg-white text-black">
          {activeSideBtn()}
        </section>
      </div>
    </>
  );
};

export default MyPage;
