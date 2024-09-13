import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../../api/auth';
import useUserStore from '../../../store/useUserStore';

export const useLoginQuery = () => {
  const setHasAuthenticated = useUserStore((state) => state.setHasAuthenticated);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData) => login(userData),
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.accessToken);
      setHasAuthenticated(true);
      queryClient.invalidateQueries(['userProfile']);
    },
    onError: (error) => alert(error.response.data.message)
  });
};
