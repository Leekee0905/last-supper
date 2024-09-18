import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '../../../api/restaurants';

export const useGetRestaurantsDataQuery = (camp) => {
  return useQuery({
    queryKey: ['restaurants', camp],
    queryFn: () => getRestaurants(camp)
  });
};
