import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStore from '../../../store/useUserStore';
import useModalStore from '../../../store/useModalStore';
import { login } from '../../../api/auth';

export const useLoginQuery = () => {
  const setHasAuthenticated = useUserStore((state) => state.setHasAuthenticated);
  const setHasOpenModal = useModalStore((state) => state.setHasOpen);
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData) => login(userData),
    onSuccess: (response) => {
      setUser(response);
      setHasAuthenticated(true);
      alert('로그인 되었습니다.');
      setHasOpenModal(false);
      queryClient.invalidateQueries(['userProfile']);
      queryClient.invalidateQueries(['token']);
    },
    onError: (error) => alert(error.response.data.message)
  });
};
