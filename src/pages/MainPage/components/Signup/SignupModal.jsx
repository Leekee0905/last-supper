import { FiX } from 'react-icons/fi';
import useModalStore from '../../../../store/useModalStore';
import AuthForm from '../AuthForm';

const SignupModal = () => {
  const setHasOpenModal = useModalStore((state) => state.setHasOpen);
  return (
    <>
      <div className="flex justify-end h-[5vh] pt-[1vh] pr-[1vw]">
        <button onClick={() => setHasOpenModal(false)}>
          <FiX className="text-3xl hover:text-[var(--black-color)] active:opacity-50" />
        </button>
      </div>
      <AuthForm mode="signup" />
    </>
  );
};

export default SignupModal;
