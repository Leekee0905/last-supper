import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeMyActivity, updateMyActivity } from '../../../../api/MyActivitesApi';
import useUserStore from '../../../../store/useUserStore';

const ReviewItem = ({ el }) => {
  const { user } = useUserStore((state) => state);
  const [updatePost, setUpdatePost] = useState('');
  const [isUpdatePost, setIsUpdatePost] = useState(false);
  const queryClient = useQueryClient();

  // 리뷰 삭제
  const { mutate: deleteFunc } = useMutation({
    mutationFn: removeMyActivity,

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(['allReviews']);
      const previousReviews = queryClient.getQueryData(['allReviews']);

      queryClient.setQueryData(['allReviews'], (old) => old.filter((review) => review.id !== id));

      return { previousReviews };
    },

    onError: (context) => {
      queryClient.setQueryData(['allReviews'], context.previousReviews);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['allReviews']);
    }
  });

  // 리뷰 수정
  const { mutate: updateFunc } = useMutation({
    mutationFn: updateMyActivity,

    onMutate: async ({ id, content }) => {
      await queryClient.cancelQueries(['allReviews']);
      const previousReviews = queryClient.getQueryData(['allReviews']);

      queryClient.setQueryData(['allReviews'], (old) => {
        const updateReview = old.filter((review) => review.id === id)[0];
        const result = { ...updateReview, review: content };

        const updateReviews = old.map((el) => {
          if (el.id === id) {
            return result;
          }
          return el;
        });

        return updateReviews;
      });

      return { previousReviews };
    },

    onError: (context) => {
      queryClient.setQueryData(['allReviews'], context.previousReviews);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['allReviews']);
    }
  });

  // 리뷰 수정버튼 클릭 시
  const onUpdatePost = ({ queryKey, id, content }) => {
    setIsUpdatePost((prev) => !prev);
    if (isUpdatePost) {
      if (content === '') {
        alert('변경된 내용이 없습니다.');
        return;
      }
      updateFunc({ queryKey, id, content });
      setUpdatePost('');
    }
  };

  return (
    <div className="border border-solid border-black p-[20px] leading-[28px] rounded-[16px] bg-white">
      <div className="flex justify-between">
        <div className="font-black text-[20px]">{el.nickName}</div>
        <div>{el.date}</div>
      </div>
      <p className="m-[20px] break-all">
        {isUpdatePost ? (
          <textarea
            type="text"
            rows="4"
            placeholder="수정할 내용을 입력하세요."
            onChange={(e) => setUpdatePost(e.target.value)}
            defaultValue={el.review}
            onKeyDown={(e) =>
              e.code === 'Enter' && !e.shiftKey && onUpdatePost({ queryKey: 'reviews', id: el.id, content: updatePost })
            }
            className="placeholder:text-black border border-solid placeholder:text-[12px] border-black w-full"
          />
        ) : (
          el.review
        )}
      </p>
      {el.userId === user.userId ? (
        <div className="flex justify-end gap-[20px]">
          <button
            className="border border-solid border-black rounded-[8px] w-[60px] bg-[#536349] text-white hover:bg-[#A4AE9D] hover:text-black"
            onClick={() => onUpdatePost({ queryKey: 'reviews', id: el.id, content: updatePost })}
          >
            {isUpdatePost ? '완료' : '수정'}
          </button>
          <button
            className="border border-solid border-black rounded-[8px] w-[60px] bg-[#536349] text-white hover:bg-[#A4AE9D] hover:text-black"
            onClick={() => deleteFunc({ queryKey: 'reviews', id: el.id })}
          >
            삭제
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ReviewItem;
