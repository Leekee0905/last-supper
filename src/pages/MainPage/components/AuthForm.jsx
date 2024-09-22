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

  const handleAskAccountLink = () => {
    if (mode === 'signup') {
      setModalType('login');
    }
    if (mode === 'login') {
      setModalType('signup');
    }
  };
  return (
    <div className="shadow-xl rounded-lg w-5/6 h-[600px] p-10 flex flex-col justify-between bg-white ">
      <span className="lg:text-2xl md:text-xl font-bold px-10">{mode === 'login' ? '로그인' : '회원가입'}</span>
      <div className="flex justify-center items-center h-full flex-col">
        <form
          onSubmit={handleSubmit}
          className="lg:w-[650px] md:w-[450px] sm:w-[300px] mt-10 flex flex-col justify-center items-center"
        >
          <input
            className="w-full h-1/5 p-5 mb-5 border-2"
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
            className="w-full h-1/5 p-5 mb-5 border-2"
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
              className="w-full h-1/5 p-5 mb-5 border-2"
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
            className="flex justify-center items-center border-2 w-full h-[65px] bg-[--dark-khaki-color] text-white lg:text-2xl md:text-base sm:text-sm"
          >
            {mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>
        <span className="text-sm my-5">
          {mode === 'signup' ? '이미 계정이 있으신가요? ' : '계정이 없으신가요? '}
          <span className="text-[--dark-khaki-color] font-bold cursor-pointer" onClick={handleAskAccountLink}>
            {mode === 'signup' ? '로그인' : '회원가입'}
          </span>
        </span>
      </div>
    </div>
  );
};
export default AuthForm;
