import { useMutation } from '@tanstack/react-query';
import { register } from '../../../api/auth';
import useModalStore from '../../../store/useModalStore';
import { useAlertStore } from '../../../store/useAlertStore';

export const useSignupQuery = () => {
  const setModalType = useModalStore((state) => state.setModalType);
  const addAlert = useAlertStore((state) => state.addAlert);
  return useMutation({
    mutationFn: (formData) => register(formData),
    onSuccess: () => {
      addAlert('회원가입 성공!', 'success');
      setModalType('login');
    },
    onError: (error) => addAlert(`회원가입 실패\n ${error.message}`, 'error')
  });
};
