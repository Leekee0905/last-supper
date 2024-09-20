import React, { useState } from 'react';
import useUserStore from '../../../../store/useUserStore';
import useUpdateProfileQuery from '../../../../hooks/queries/auth/useUpdateProfileQuery';

const Profile = () => {
  const { user } = useUserStore((state) => state);
  const { mutate: updateNickname } = useUpdateProfileQuery();

  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e) => {
    e.preventDefault();
    updateNickname({ nickname });
    setNickname('');
  };

  return (
    <>
      <h3>개인정보</h3>
      <p>현재 닉네임 : {user.nickname}</p>
      <form onSubmit={(e) => handleNicknameChange(e)} className="flex flex-col items-center gap-5">
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="변경할 닉네임을 입력해주세요."
          required
          className="w-2/3 h-16 border rounded pl-4 mt-[15vh]"
        />
        <button className="bg-[var(--green-color)] w-1/3 h-10 rounded hover:bg-[var(--brown-color)] active:opacity-50 text-white">
          닉네임 수정
        </button>
      </form>
    </>
  );
};

export default Profile;
