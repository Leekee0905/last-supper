import useRestaurantsStore from '../../../../store/useRestaurantsInfo';
import { FiX } from 'react-icons/fi';
import { useState } from 'react';
import useReview from '../../../../store/useReview';
import useUserStore from '../../../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const DetailModal = ({ detailInfo }) => {
  const [content, setContent] = useState('');
  const { user, hasAuthenticated } = useUserStore((state) => state);
  const { reviews, setReview } = useReview((state) => state);
  const { setIsOpen } = useRestaurantsStore((state) => state);
  const subContent = detailInfo.category_name.split('').slice(6).join('');
  console.log(user, 'user 값 확인');
  console.log(reviews, 'reviews 값 확인');
  let today = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasAuthenticated) {
      alert('로그인 해주세요');
    } else {
      console.log(content, 'content 확인');
      setReview({
        userId: user.userId,
        nickName: user.nickname,
        storeId: detailInfo.id,
        storeName: detailInfo.place_name,
        storeAddress: detailInfo.address_name,
        storePhone: detailInfo.phone,
        review: content,
        date: today.toLocaleString()
      });
    }
  };

  const filterPosts = reviews.filter((el) => el.storeId === detailInfo.id);

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
        <p style={{ fontWeight: '900', fontSize: '28px' }}>{detailInfo.place_name}</p>
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
          <button>추가</button>
        </form>
        <div>
          {filterPosts.map((el, index) => {
            return (
              <div key={index} style={{ border: '1px solid black', padding: '20px', lineHeight: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>{el.nickName}</div>
                  <div>{el.date}</div>
                </div>
                <p style={{ margin: '20px' }}>{el.review}</p>
                {el.userId === user.userId ? (
                  <div style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
                    <button style={{ border: '1px solid black', padding: '4px', borderRadius: '12px' }}>수정</button>
                    <button style={{ border: '1px solid black', padding: '4px', borderRadius: '12px' }}>삭제</button>
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
