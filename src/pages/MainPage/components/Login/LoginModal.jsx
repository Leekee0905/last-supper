import { FiX } from 'react-icons/fi';
import useModalStore from '../../../../store/useModalStore';
import AuthForm from '../AuthForm';
import Modal from '../Modal/Modal';

const LoginModal = () => {
  const setHasOpenModal = useModalStore((state) => state.setHasOpen);
  return (
    <>
      <AuthForm mode={'login'} />
    </>
  );
};

export default LoginModal;
