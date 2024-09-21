import AuthForm from '../AuthForm';

const LoginModal = () => {
  return (
    <div className="flex justify-center items-center text-black">
      <AuthForm mode={'login'} />
    </div>
  );
};

export default LoginModal;
