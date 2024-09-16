import { useState } from 'react';
import useModalStore from '../../../../store/useModalStore';
import Profile from './Profile';
import MyActivities from './MyActivities';
import { useQueryClient } from '@tanstack/react-query';
import { getMyFavorites } from '../../../../api/favorites';
import queryKeys from '../../../../hooks/queries/queryKeys';
import { useGetMyReviewsQuery } from '../../../../hooks/queries/myActivities/reviewsQuery';
import { getMyReviews } from '../../../../api/reviews';
import { useFavoriteDeleteMutate, useGetMyFavoritesQuery } from '../../../../hooks/queries/myActivities/favoritesQuery';

const MY_PAGE_NAV = { profile: 'profile', favorites: 'favorites', myReviews: 'myReviews' };

const MyPage = () => {
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);
  const [activeNav, setActiveNav] = useState(MY_PAGE_NAV.profile);
  const { mutate: removeFavoriteMutate } = useFavoriteDeleteMutate();

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
  const queryClient = useQueryClient();
  const favoritesPrefetchQuery = () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.boardController.favorites(userId, 1),
      queryFn: getMyFavorites
    });
  };

  const reviewsPrefetchQuery = () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.boardController.reviews(userId, 1),
      queryFn: getMyReviews
    });
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
            onMouseOver={favoritesPrefetchQuery}
          >
            <span>즐겨찾기</span>
          </nav>
          <nav
            className={`my-page-nav ${activeNav === MY_PAGE_NAV.myReviews && 'my-page-nav-active'}`}
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.myReviews);
            }}
            onMouseOver={reviewsPrefetchQuery}
          >
            <span>내 리뷰</span>
          </nav>
        </aside>
        <section className="flex flex-col gap-2 grow border rounded py-5 px-6 bg-[var(--green-color)] text-[var(--black-color)]">
          {activeSideBtn()}
        </section>
      </div>
    </>
  );
};

export default MyPage;
