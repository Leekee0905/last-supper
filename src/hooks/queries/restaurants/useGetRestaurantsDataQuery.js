import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '../../../api/restaurants';

export const useGetRestaurantsDataQuery = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants
  });
};
