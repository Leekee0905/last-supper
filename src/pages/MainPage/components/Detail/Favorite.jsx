import { PiStar } from 'react-icons/pi';
import { PiStarFill } from 'react-icons/pi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addMyActivity, getMyActivity, removeMyActivity } from '../../../../api/myActivitesApi';
import useUserStore from '../../../../store/useUserStore';

const Favorite = ({ detailInfo }) => {
  const { user, hasAuthenticated } = useUserStore((state) => state);
  const queryClient = useQueryClient();
  const styleBtn = 'text-yellow-500 text-[24px]';

  // NOTE query hook으로 만들기
  // 즐겨찾기 가져오기
  const {
    data: starData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['allFavorites'],
    queryFn: () => getMyActivity('favorites')
  });

  // 즐겨찾기 추가
  const { mutate: addFunc } = useMutation({
    mutationFn: addMyActivity,

    onMutate: async ({ post }) => {
      await queryClient.cancelQueries(['allFavorites']);
      const previousReviews = queryClient.getQueryData(['allFavorites']);

      queryClient.setQueryData(['allFavorites'], (old) => [...old, post]);

      return { previousReviews };
    },

    onError: (context) => {
      queryClient.setQueryData(['allFavorites'], context.previousReviews);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['allFavorites']);
    }
  });

  // 즐겨찾기 삭제
  const { mutate: deleteFunc } = useMutation({
    mutationFn: removeMyActivity,

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(['allFavorites']);
      const previousReviews = queryClient.getQueryData(['allFavorites']);

      queryClient.setQueryData(['allFavorites'], (old) => old.filter((favorite) => favorite.id !== id));

      return { previousReviews };
    },

    onError: (context) => {
      queryClient.setQueryData(['allFavorites'], context.previousReviews);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['allFavorites']);
    }
  });

  if (isPending) return <div>로딩중 입니다.</div>;
  if (isError) return <div>로딩중 에러가 발견되었습니다.</div>;

  // 즐겨찾기 클릭 시
  const onClickStar = () => {
    if (!hasAuthenticated) {
      alert('로그인 해주세요');
      return;
    }

    const res = starData.some((el) => el.storeId === detailInfo.id && el.userId === user.userId);

    if (res) {
      const data = starData.filter((el) => el.storeId === detailInfo.id && el.userId === user.userId)[0];
      deleteFunc({
        queryKey: 'favorites',
        id: data.id
      });
    } else {
      addFunc({
        queryKey: 'favorites',
        post: {
          userId: user.userId,
          nickName: user.nickname,
          storeId: detailInfo.id,
          storeName: detailInfo.place_name,
          storeAddress: detailInfo.address_name,
          storePhone: detailInfo.phone,
          favorite: true
        }
      });
      alert('즐겨찾기에 추가 되었습니다.');
    }
  };

  const filterData = starData.some((el) => el.storeId === detailInfo.id && el.userId === user.userId);

  return (
    <div className="cursor-pointer text-[30px]" onClick={onClickStar}>
      {filterData ? (
        starData.filter((el) => el.storeId === detailInfo.id && el.userId === user.userId)[0].favorite ? (
          <PiStarFill className={styleBtn} />
        ) : (
          <PiStar className={styleBtn} />
        )
      ) : (
        <PiStar className={styleBtn} />
      )}
    </div>
  );
};
export default Favorite;
