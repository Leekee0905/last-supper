import { FiX } from 'react-icons/fi';
import { PiStar } from 'react-icons/pi';
import { PiStarFill } from 'react-icons/pi';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useUserStore from '../../../../store/useUserStore';
import useRestaurantsStore from '../../../../store/useRestaurantsInfo';
import { addMyActivity, getMyActivity, removeMyActivity, updateFavorite } from '../../../../api/MyActivitesApi';
import Review from './Review';

const DetailModal = ({ detailInfo }) => {
  const [content, setContent] = useState('');
  const { user, hasAuthenticated } = useUserStore((state) => state);
  const { setIsOpen } = useRestaurantsStore((state) => state);
  const subContent = detailInfo.category_name.split('').slice(6).join('');
  let today = new Date();
  const queryClient = useQueryClient();
  console.log(user, 'user 정보');
  console.log(detailInfo, 'detailInfo 값 확인');
  // 리뷰 가져오기
  const { data, isPending, isError } = useQuery({
    queryKey: ['review'],
    queryFn: () => getMyActivity('reviews')
  });

  // 즐겨찾기 가져오기
  const {
    data: starData,
    isPending: isStarPending,
    isError: isStarError
  } = useQuery({
    queryKey: ['star'],
    queryFn: () => getMyActivity('favorites')
  });

  // 리뷰 및 즐겨찾기 추가
  const { mutate: addFunc } = useMutation({
    mutationFn: addMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['review']);
      queryClient.invalidateQueries(['star']);
    }
  });

  // 즐겨찾기 삭제
  const { mutate: deleteFunc } = useMutation({
    mutationFn: removeMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['review']);
      queryClient.invalidateQueries(['star']);
    }
  });

  // 즐겨찾기 수정
  const { mutate: updateStar } = useMutation({
    mutationFn: updateFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(['star']);
    }
  });

  if (isPending) return <div>로딩중 입니다.</div>;
  if (isError) return <div>로딩중 에러가 발견되었습니다.</div>;
  if (isStarPending) return <div>로딩중 입니다.</div>;
  if (isStarError) return <div>로딩중 에러가 발견되었습니다.</div>;
  console.log(starData, 'starData 값 확인');
  // Form submit 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasAuthenticated) {
      alert('로그인 해주세요');
      return;
    }
    addFunc({
      queryKey: 'reviews',
      post: {
        userId: user.userId,
        nickName: user.nickname,
        storeId: detailInfo.id,
        storeName: detailInfo.place_name,
        storeAddress: detailInfo.address_name,
        storePhone: detailInfo.phone,
        review: content,
        date: today.toLocaleString()
      }
    });
    setContent('');
  };

  // 즐겨찾기 클릭 시
  const onClickStar = () => {
    const res = starData.some((el) => el.storeId === detailInfo.id && el.userId === user.userId);
    console.log(res, 'res 값 확인');
    if (res) {
      const data = starData.filter((el) => el.storeId === detailInfo.id && el.userId === user.userId)[0];
      console.log(data, 'data 값 확인');
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
  console.log(filterData, 'filterDate 값 확인');

  return (
    <div
      style={{
        zIndex: '40',
        position: 'absolute',
        backgroundColor: '#d2caca',
        width: '25%',
        height: '83%',
        left: '27%',
        padding: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: '12PX',
        overflowY: 'scroll'
      }}
    >
      <div style={{ textAlign: 'right' }}>
        <button onClick={() => setIsOpen(false)} style={{ fontSize: '20px' }}>
          <FiX />
        </button>
      </div>
      <div style={{ lineHeight: '32px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontWeight: '900', fontSize: '28px', marginRight: '10px' }}>{detailInfo.place_name}</p>
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
        </div>
        <p style={{ fontSize: '13px', opacity: '0.5' }}>{subContent}</p>
        <p>주소: {detailInfo.address_name}</p>
        <p>전화번호: {detailInfo.phone}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="리뷰를 작성해 주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button style={{ border: '1px solid black', padding: '4px', borderRadius: '12px' }}>추가</button>
        </form>
        <div>
          {data
            .filter((el) => el.storeId === detailInfo.id)
            .map((el, index) => {
              return <Review key={index} el={el} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
