import { useState } from 'react';
import Profile from './Profile';
import MyActivities from './MyActivities';
import { useGetMyReviewsQuery, useReviewsPrefetchQuery } from '../../../../hooks/queries/myActivities/reviewsQuery';
import {
  useFavoriteDeleteMutate,
  useFavoritesPrefetchQuery,
  useGetMyFavoritesQuery
} from '../../../../hooks/queries/myActivities/favoritesQuery';
import useUserStore from '../../../../store/useUserStore';

const MY_PAGE_NAV = { profile: 'profile', favorites: 'favorites', myReviews: 'myReviews' };

const MyPage = () => {
  const [activeNav, setActiveNav] = useState(MY_PAGE_NAV.profile);
  const { mutate: removeFavoriteMutate } = useFavoriteDeleteMutate();

  // const { userId } = useUserStore((state) => state);
  const userId = 'user123';

  // 즐겨찾기 삭제하는 함수
  const removeFavorite = (id) => {
    if (confirm('즐겨찾기에서 삭제하시겠습니까?')) {
      removeFavoriteMutate(id);
      alert('즐겨찾기에서 삭제하였습니다.');
    } else {
      alert('삭제를 취소하였습니다.');
    }
  };

  // 사이드 네비를 클릭하면 불러올 컴포넌트
  const activeSideBtn = () => {
    switch (activeNav) {
      case MY_PAGE_NAV.profile:
        return <Profile />;
      case MY_PAGE_NAV.favorites:
        return <MyActivities getData={useGetMyFavoritesQuery} removeFavorite={removeFavorite} />;
      case MY_PAGE_NAV.myReviews:
        return <MyActivities getData={useGetMyReviewsQuery} />;
      default:
        throw new Error('잘못된 요청을 하셨습니다.');
    }
  };

  // prefetch 함수
  const prefetchFavorites = useFavoritesPrefetchQuery(userId);
  const prefetchReviews = useReviewsPrefetchQuery(userId);

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
            onMouseOver={prefetchFavorites}
          >
            <span>즐겨찾기</span>
          </nav>
          <nav
            className={`my-page-nav ${activeNav === MY_PAGE_NAV.myReviews && 'my-page-nav-active'}`}
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.myReviews);
            }}
            onMouseOver={prefetchReviews}
          >
            <span>내 리뷰</span>
          </nav>
        </aside>
        <section className="flex flex-col gap-2 grow border rounded py-5 px-6 ]">{activeSideBtn()}</section>
      </div>
    </>
  );
};

export default MyPage;
