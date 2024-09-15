import useModalStore from '../../../../store/useModalStore';
import AuthForm from '../AuthForm';

const SignupModal = () => {
  const setHasOpenModal = useModalStore((state) => state.setHasOpen);
  return (
    <>
      <AuthForm mode="signup" />
      <button onClick={() => setHasOpenModal(false)}>닫기</button>
    </>
  );
};

export default SignupModal;
