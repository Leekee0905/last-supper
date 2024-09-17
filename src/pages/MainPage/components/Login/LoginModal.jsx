import { FiX } from 'react-icons/fi';
import useModalStore from '../../../../store/useModalStore';
import AuthForm from '../AuthForm';
import Modal from '../Modal/Modal';

const LoginModal = () => {
  const setHasOpenModal = useModalStore((state) => state.setHasOpen);
  return (
    <>
      <div className="flex justify-end h-[5vh] pt-[1vh] pr-[1vw]">
        <button onClick={() => setHasOpenModal(false)}>
          <FiX className="text-3xl hover:text-[var(--black-color)] active:opacity-50" />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <AuthForm mode={'login'} />
      </div>
    </>
  );
};

export default LoginModal;
