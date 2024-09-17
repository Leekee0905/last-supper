import { FiX } from 'react-icons/fi';
import useModalStore from '../../../../store/useModalStore';
import AuthForm from '../AuthForm';

const SignupModal = () => {
  const setHasOpenModal = useModalStore((state) => state.setHasOpen);
  return (
    <>
      <AuthForm mode="signup" />
    </>
  );
};

export default SignupModal;
