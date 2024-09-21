import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../../../api/auth';
import queryKeys from '../queryKeys';

export const useHasTokenAuthenticatedQuery = () => {
  const token = JSON.parse(localStorage.getItem('userStorage'))?.state.user.accessToken;
  return useQuery({
    queryKey: queryKeys.user.token,
    queryFn: getUserProfile,
    enabled: !!token,
    select: (data) => data.success
  });
};
