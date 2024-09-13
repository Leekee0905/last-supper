import useModalStore from '../../../../store/useModalStore';
import AuthForm from '../AuthForm';
import Modal from '../Modal/Modal';

const LoginModal = () => {
  const setHasOpenModal = useModalStore((state) => state.setHasOpen);
  return (
    <Modal>
      <AuthForm mode={'login'} />
      <button onClick={() => setHasOpenModal(false)}>닫기</button>
    </Modal>
  );
};

export default LoginModal;
