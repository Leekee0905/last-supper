import useRestaurantsStore from '../../../../store/useRestaurantsInfo';
import { FiX } from 'react-icons/fi';
import { useState } from 'react';
import useUserStore from '../../../../store/useUserStore';
import { PiStar } from 'react-icons/pi';
import { PiStarFill } from 'react-icons/pi';
import { addMyActivity, getMyActivity, removeMyActivity, updateMyActivity } from '../../../../api/MyActivitesApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const DetailModal = ({ detailInfo }) => {
  const [content, setContent] = useState('');
  const [updatePost, setUpdatePost] = useState('');
  const [isUpdatePost, setIsUpdatePost] = useState(false);
  const { user, hasAuthenticated } = useUserStore((state) => state);
  const { setIsOpen } = useRestaurantsStore((state) => state);
  const subContent = detailInfo.category_name.split('').slice(6).join('');
  let today = new Date();

  const queryClient = useQueryClient();
  console.log(detailInfo, 'detailInfo 값 확인');
  // 리뷰 가져오기
  const { data, isPending, isError } = useQuery({
    queryKey: ['review'],
    queryFn: () => getMyActivity('reviews')
  });

  // 리뷰 추가
  const { mutate: addFunc } = useMutation({
    mutationFn: addMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['review']);
      queryClient.invalidateQueries(['favorite']);
    }
  });

  // 리뷰 수정
  const { mutate: updateFunc } = useMutation({
    mutationFn: updateMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['review']);
    }
  });

  // 리뷰 삭제
  const { mutate: deleteFunc } = useMutation({
    mutationFn: removeMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['review']);
      queryClient.invalidateQueries(['favorite']);
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
        id: crypto.randomUUID(),
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

  // 리뷰 수정버튼 클릭 시
  const onUpdatePost = ({ queryKey, id, content }) => {
    setIsUpdatePost((prev) => !prev);
    if (isUpdatePost) {
      updateFunc({ queryKey, id, content });
      setUpdatePost('');
    }
  };

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
          <div style={{ cursor: 'pointer' }}>
            {'dd'.length > 0 ? (
              <PiStarFill style={{ color: 'yellow', fontSize: '24px' }} />
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
              return (
                <div key={index} style={{ border: '1px solid black', padding: '20px', lineHeight: '28px' }}>
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
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
