import { useState } from 'react';
import Profile from './Profile';
import MyActivities from './MyActivities';
import {
  useMyActivitiesPrefetchQuery,
  useMyActivityRemoveMutate
} from '../../../../hooks/queries/myActivities/myActivityQuery';
import { FAVORITES_QUERY_KEY, REVIEWS_QUERY_KEY } from '../../../../hooks/queries/queryKeys';
import useUserStore from '../../../../store/useUserStore';

const MY_PAGE_NAV = { profile: 'profile', favorites: 'favorites', myReviews: 'myReviews' };

const MyPage = () => {
  const { userId } = useUserStore((state) => state);

  const { mutate: removeFavoriteMutate } = useMyActivityRemoveMutate(FAVORITES_QUERY_KEY);

  // 즐겨찾기 삭제하는 함수
  const removeFavorite = (logId) => {
    if (confirm('즐겨찾기에서 삭제하시겠습니까?')) {
      removeFavoriteMutate(logId);
      alert('즐겨찾기에서 삭제하였습니다.');
    } else {
      alert('삭제를 취소하였습니다.');
    }
  };

  // prefetch 함수
  const prefetchMyActivities = useMyActivitiesPrefetchQuery(userId);

  const [activeNav, setActiveNav] = useState(MY_PAGE_NAV.profile);
  // 사이드 네비를 클릭하면 불러올 컴포넌트
  const activeSideBtn = () => {
    switch (activeNav) {
      case MY_PAGE_NAV.profile:
        return <Profile />;
      case MY_PAGE_NAV.favorites:
        return <MyActivities queryKey={FAVORITES_QUERY_KEY} removeFavorite={removeFavorite} />;
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
        <section className="flex flex-col gap-2 grow border rounded py-5 px-6">{activeSideBtn()}</section>
      </div>
    </>
  );
};

export default MyPage;
