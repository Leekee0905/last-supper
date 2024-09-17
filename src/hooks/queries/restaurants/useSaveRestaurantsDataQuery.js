import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveRestaurants } from '../../../api/restaurants';

export const useSaveRestaurantsDataQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveRestaurants,
    onSuccess: (response) => queryClient.invalidateQueries(['restaurants']),
    onError: (error) => console.error(error)
  });
};
