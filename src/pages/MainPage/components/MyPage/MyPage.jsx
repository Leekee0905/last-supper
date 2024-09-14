import { useState } from 'react';
import useModalStore from '../../../../store/useModalStore';
import Profile from './Profile';
import MyActivities from './MyActivities';
import { useFavoriteDeleteMutate, useGetMyFavoritesQuery } from '../../../../queries/favoritesQuery';
import { useGetMyReviewsQuery } from '../../../../queries/reviewsQuery';
import { FiX } from 'react-icons/fi';

const MY_PAGE_NAV = { profile: 'profile', favorites: 'favorites', myReviews: 'myReviews' };

const MyPage = () => {
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);
  const [activeNav, setActiveNav] = useState(MY_PAGE_NAV.profile);
  const { mutate: removeFavoriteMutate } = useFavoriteDeleteMutate();

  const activeSideBtn = () => {
    switch (activeNav) {
      case MY_PAGE_NAV.profile:
        return <Profile />;
      case MY_PAGE_NAV.favorites:
        return (
          <MyActivities favorites={true} getData={useGetMyFavoritesQuery} removeFavoriteMutate={removeFavoriteMutate} />
        );
      case MY_PAGE_NAV.myReviews:
        return <MyActivities getData={useGetMyReviewsQuery} />;
      default:
        throw new Error('잘못된 요청을 하셨습니다.');
    }
  };

  return (
    <>
      <div className="flex justify-end h-[5vh] pt-[1vh] pr-[1vw]">
        <button onClick={setHasModalOpen}>
          <FiX className="text-gray-600 text-3xl" />
        </button>
      </div>
      <div className="flex flex-row w-[77vw] h-[70vh] mr-[3vw]">
        <aside className="flex flex-col w-[200px] gap-6">
          <h2 className="mb-4">마이페이지</h2>
          <nav
            className={activeNav === MY_PAGE_NAV.profile ? 'my-page-nav my-page-nav-active' : 'my-page-nav'}
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.profile);
            }}
          >
            <span>개인 정보</span>
          </nav>
          <nav
            className={activeNav === MY_PAGE_NAV.favorites ? 'my-page-nav my-page-nav-active' : 'my-page-nav'}
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.favorites);
            }}
          >
            <span>즐겨찾기</span>
          </nav>
          <nav
            className={activeNav === MY_PAGE_NAV.myReviews ? 'my-page-nav my-page-nav-active' : 'my-page-nav'}
            onClick={() => {
              setActiveNav(MY_PAGE_NAV.myReviews);
            }}
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
