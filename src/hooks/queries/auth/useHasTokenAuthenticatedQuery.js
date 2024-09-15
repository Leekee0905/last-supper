import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../../../api/auth';

export const useHasTokenAuthenticatedQuery = () => {
  const token = JSON.parse(localStorage.getItem('userStorage'))?.state.user.accessToken;
  return useQuery({
    queryKey: ['token'],
    queryFn: () => getUserProfile(token),
    enabled: !!token,
    select: (data) => data.success
  });
};
