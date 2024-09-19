import AuthForm from '../AuthForm';

const LoginModal = () => {
  return (
    <div className="flex justify-center items-center">
      <AuthForm mode={'login'} />
    </div>
  );
};

export default LoginModal;
