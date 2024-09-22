import React, { useState } from 'react';
import useUserStore from '../../../../store/useUserStore';
import useUpdateProfileQuery from '../../../../hooks/queries/auth/useUpdateProfileQuery';
import {
  useGetMyActivitiesQuery,
  useReviewNicknameUpdateMutate
} from '../../../../hooks/queries/myActivities/myActivityQuery';
import { REVIEWS_QUERY_KEY } from '../../../../hooks/queries/queryKeys';

const Profile = () => {
  const { user } = useUserStore((state) => state);
  const { mutate: updateNickname } = useUpdateProfileQuery();
  const { mutate: reviewsNicknameUpdate } = useReviewNicknameUpdateMutate(REVIEWS_QUERY_KEY, user.userId);
  const { data: myReviews } = useGetMyActivitiesQuery(REVIEWS_QUERY_KEY, user.userId).data;

  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e) => {
    e.preventDefault();
    updateNickname({ nickname });
    myReviews.forEach((review) => reviewsNicknameUpdate({ targetId: review.id, nickName: nickname }));
    setNickname('');
  };

  return (
    <>
      <h3>개인정보</h3>
      <p className="mt-[3vh] text-2xl">현재 닉네임 : {user.nickname}</p>
      <form onSubmit={(e) => handleNicknameChange(e)} className="flex flex-col items-center gap-5 h-1/2">
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="변경할 닉네임을 입력해주세요."
          required
          className="w-2/3 h-1/3 border rounded pl-4 mt-[15vh] border-[--dark-khaki-color] placeholder:text-base"
        />
        <button className="bg-[--khaki-color] w-1/3 h-1/4 rounded hover:bg-[--dark-khaki-color] active:opacity-50 text-white text-lg">
          닉네임 수정
        </button>
      </form>
    </>
  );
};

export default Profile;
