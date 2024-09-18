import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveRestaurants } from '../../../api/restaurants';

export const useSaveRestaurantsDataQuery = (camp) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveRestaurants,
    onSuccess: () => queryClient.invalidateQueries(['restaurants', camp]),
    onError: (error) => console.error(error)
  });
};
