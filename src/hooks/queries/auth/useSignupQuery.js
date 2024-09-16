import { useMutation } from '@tanstack/react-query';
import { register } from '../../../api/auth';
import useModalStore from '../../../store/useModalStore';

export const useSignupQuery = () => {
  const setModalType = useModalStore((state) => state.setModalType);
  return useMutation({
    mutationFn: (formData) => register(formData),
    onSuccess: () => {
      alert('회원가입 성공!');
      setModalType('login');
    },
    onError: (error) => alert(`회원가입 실패\n ${error.message}`)
  });
};
