import { useState } from 'react';
import useUserStore from '../../../../store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeMyActivity, updateMyActivity } from '../../../../api/myActivitesApi';

const Review = ({ el }) => {
  const [updatePost, setUpdatePost] = useState('');
  const [isUpdatePost, setIsUpdatePost] = useState(false);
  const { user } = useUserStore((state) => state);

  const queryClient = useQueryClient();

  // 리뷰 삭제
  const { mutate: deleteFunc } = useMutation({
    mutationFn: removeMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['review']);
    }
  });

  // 리뷰 수정
  const { mutate: updateFunc } = useMutation({
    mutationFn: updateMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['review']);
    }
  });

  // 리뷰 수정버튼 클릭 시
  const onUpdatePost = ({ queryKey, id, content }) => {
    setIsUpdatePost((prev) => !prev);
    if (isUpdatePost) {
      if (content === '') {
        alert('내용을 입력해 주세요.');
        return;
      }
      updateFunc({ queryKey, id, content });
      setUpdatePost('');
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '20px', lineHeight: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{el.nickName}</div>
        <div>{el.date}</div>
      </div>
      <p style={{ margin: '20px' }}>
        {isUpdatePost ? (
          <input
            type="text"
            value={updatePost}
            placeholder="수정할 내용을 입력하세요."
            onChange={(e) => setUpdatePost(e.target.value)}
          />
        ) : (
          el.review
        )}
      </p>
      {el.userId === user.userId ? (
        <div style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <button
            style={{ border: '1px solid black', padding: '4px', borderRadius: '12px' }}
            onClick={() => onUpdatePost({ queryKey: 'reviews', id: el.id, content: updatePost })}
          >
            {isUpdatePost ? '완료' : '수정'}
          </button>
          <button
            style={{ border: '1px solid black', padding: '4px', borderRadius: '12px' }}
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

export default Review;
