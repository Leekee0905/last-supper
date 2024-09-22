import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addMyActivity, getMyActivity } from '../../../../api/myActivitesApi';
import useUserStore from '../../../../store/useUserStore';
import ReviewItem from './ReviewItem';

const Review = ({ detailInfo }) => {
  const [content, setContent] = useState('');
  const { user, hasAuthenticated } = useUserStore((state) => state);
  const queryClient = useQueryClient();
  let today = new Date();

  // NOTE query hook으로 빼기
  // 리뷰 가져오기
  const { data, isPending, isError } = useQuery({
    queryKey: ['allReviews'],
    queryFn: () => getMyActivity('reviews')
  });

  // 리뷰 추가
  const { mutate: addFunc } = useMutation({
    mutationFn: addMyActivity,

    onMutate: async ({ post }) => {
      await queryClient.cancelQueries(['allReviews']);
      const previousReviews = queryClient.getQueryData(['allReviews']);

      queryClient.setQueryData(['allReviews'], (old) => [...old, post]);

      return { previousReviews };
    },

    onError: (context) => {
      queryClient.setQueryData(['allReviews'], context.previousReviews);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['allReviews']);
    }
  });

  if (isPending) return <div>로딩중 입니다.</div>;
  if (isError) return <div>로딩중 에러가 발견되었습니다.</div>;

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
      <form onSubmit={handleSubmit} className="my-[20px] flex justify-between">
        <input
          type="text"
          placeholder="리뷰를 작성해 주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-[80%] p-[4px] rounded-[4px]"
        />
        <button className="border border-solid border-black p-[4px] rounded-[8px] w-[50px] bg-white">추가</button>
      </form>
      <div className="flex flex-col gap-[24px]">
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
