import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addMyActivity, getMyActivity } from '../../../../api/MyActivitesApi';
import useUserStore from '../../../../store/useUserStore';
import ReviewItem from './ReviewItem';

const Review = ({ detailInfo }) => {
  const [content, setContent] = useState('');
  const { user, hasAuthenticated } = useUserStore((state) => state);
  const queryClient = useQueryClient();
  let today = new Date();

  // 리뷰 가져오기
  const { data } = useQuery({
    queryKey: ['allReviews'],
    queryFn: () => getMyActivity('reviews'),
    suspense: true
  });

  // 리뷰 추가
  const { mutate: addFunc } = useMutation({
    mutationFn: addMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['allReviews']);
    }
  });

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

  return (
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
            return <ReviewItem key={index} el={el} />;
          })}
      </div>
    </div>
  );
};

export default Review;
