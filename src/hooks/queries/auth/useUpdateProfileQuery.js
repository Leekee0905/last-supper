import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../../../api/auth';
import useUserStore from '../../../store/useUserStore';
import { useAlertStore } from '../../../store/useAlertStore';

const useUpdateProfileQuery = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const addAlert = useAlertStore((state) => state.addAlert);
  return useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: (response) => {
      setUser({ ...user, nickname: response.nickname });
      addAlert(response.message, 'success');
    },
    onError: (error) => addAlert(error.response.data.message, 'error')
  });
};

export default useUpdateProfileQuery;
