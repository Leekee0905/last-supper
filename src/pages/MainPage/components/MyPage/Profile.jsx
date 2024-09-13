import React, { useState } from 'react';
import useUserStore from '../../../../store/useUserStore';

const Profile = () => {
  const { user } = useUserStore((state) => state);

  const [nickname, setNickname] = useState('');

  const changeNickname = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h3>개인정보</h3>
      <p>현재 닉네임 : {user.nickname}</p>
      <form onSubmit={(e) => changeNickname(e)}>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="변경할 닉네임을 입력해주세요."
        />
        <button>닉네임 수정</button>
      </form>
    </>
  );
};

export default Profile;
