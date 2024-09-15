import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from './queryKeys';
import { getMyFavorites, removeFavorite } from '../api/favorites';

export const useGetMyFavoritesQuery = (userId, page) => {
  return useQuery({
    queryKey: queryKeys.boardController.favorites(userId, page),
    queryFn: (signal) => getMyFavorites(signal),
    keepPreviousData: true
  });
};

export const useFavoriteDeleteMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.boardController.favorites());
    }
  });
};
