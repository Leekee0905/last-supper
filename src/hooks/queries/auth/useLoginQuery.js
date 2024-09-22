import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStore from '../../../store/useUserStore';
import useModalStore from '../../../store/useModalStore';
import { login } from '../../../api/auth';
import queryKeys from '../queryKeys';
import { useAlertStore } from '../../../store/useAlertStore';

export const useLoginQuery = () => {
  const setHasAuthenticated = useUserStore((state) => state.setHasAuthenticated);
  const setHasOpenModal = useModalStore((state) => state.setHasOpen);
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const addAlert = useAlertStore((state) => state.addAlert);
  return useMutation({
    mutationFn: (userData) => login(userData),
    onSuccess: (response) => {
      setUser(response);
      setHasAuthenticated(true);
      addAlert('로그인 되었습니다.', 'success');
      setHasOpenModal(false);
      queryClient.invalidateQueries(queryKeys.user.token);
    },
    onError: (error) => addAlert(error.response.data.message, 'error')
  });
};
