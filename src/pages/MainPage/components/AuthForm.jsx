import { useState } from 'react';
import { useLoginQuery } from '../../../hooks/queries/auth/useLoginQuery';
import { useSignupQuery } from '../../../hooks/queries/auth/useSignupQuery';
import useModalStore from '../../../store/useModalStore';

const AuthForm = ({ mode }) => {
  const { mutate: loginMutate } = useLoginQuery();
  const { mutate: signupMutate } = useSignupQuery();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nickname: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const setModalType = useModalStore((state) => state.setModalType);

  const passwordValidation = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      if (!passwordValidation(value)) {
        setPasswordError('비밀번호는 최소 8자, 문자, 숫자, 특수기호가 포함되어야합니다.');
      } else {
        setPasswordError('');
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      return;
    }
    switch (mode) {
      case 'signup': {
        signupMutate(formData);
        break;
      }
      case 'login': {
        const { nickname, ...rest } = formData;
        loginMutate(rest);
        break;
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-96 h-96 p-5 bg-gray-200 mb-5 rounded-lg"
      >
        <input
          className="w-full h-1/5 p-5 mb-5 rounded-lg"
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디"
          required
          minLength="2"
        />

        <input
          type="password"
          className="w-full h-1/5 p-5 mb-5 rounded-lg"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          autoComplete="false"
          required
        />
        {passwordError ? <div className="error-box text-red-500 text-xs mb-5">{passwordError}</div> : null}
        {mode === 'signup' && (
          <input
            className="w-full h-1/5 p-5 mb-5 rounded-lg"
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            required
          />
        )}
        <button
          type="submit"
          className="bg-red-400 hover:bg-gray-200 hover:text-red-500 hover:border-black hover: border-2 text-white rounded-lg w-40 h-10"
        >
          {mode === 'login' ? '로그인' : '회원가입'}
        </button>
      </form>
      {mode === 'signup' ? (
        <span className="text-sm mb-5">
          이미 계정이 있으신가요?{' '}
          <span className="text-red-500 font-bold cursor-pointer" onClick={() => setModalType('login')}>
            로그인
          </span>
        </span>
      ) : null}
    </div>
  );
};

export default AuthForm;
