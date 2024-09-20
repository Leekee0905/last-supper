import { PiStar } from 'react-icons/pi';
import { PiStarFill } from 'react-icons/pi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addMyActivity, getMyActivity, removeMyActivity } from '../../../../api/MyActivitesApi';
import useUserStore from '../../../../store/useUserStore';

const Favorite = ({ detailInfo }) => {
  const { user, hasAuthenticated } = useUserStore((state) => state);
  const queryClient = useQueryClient();

  // 즐겨찾기 가져오기
  const { data: starData } = useQuery({
    queryKey: ['allFavorites'],
    queryFn: () => getMyActivity('favorites'),
    suspense: true
  });

  // 즐겨찾기 추가
  const { mutate: addFunc } = useMutation({
    mutationFn: addMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['allFavorites']);
    }
  });

  // 즐겨찾기 삭제
  const { mutate: deleteFunc } = useMutation({
    mutationFn: removeMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['allFavorites']);
    }
  });

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
    <div style={{ cursor: 'pointer' }} onClick={onClickStar}>
      {filterData ? (
        starData.filter((el) => el.storeId === detailInfo.id && el.userId === user.userId)[0].favorite ? (
          <PiStarFill style={{ color: 'yellow', fontSize: '24px' }} />
        ) : (
          <PiStar style={{ color: 'yellow', fontSize: '24px' }} />
        )
      ) : (
        <PiStar style={{ color: 'yellow', fontSize: '24px' }} />
      )}
    </div>
  );
};
export default Favorite;
