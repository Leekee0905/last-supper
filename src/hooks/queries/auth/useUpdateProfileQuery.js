import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../../../api/auth';
import useUserStore from '../../../store/useUserStore';

const useUpdateProfileQuery = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  return useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: (response) => {
      setUser({ ...user, nickname: response.nickname });
      alert(response.message);
    },
    onError: (error) => alert(error.response.data.message)
  });
};

export default useUpdateProfileQuery;
