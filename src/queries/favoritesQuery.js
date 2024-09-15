import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import queryKeys from './queryKeys';
import { getMyFavorites, removeFavorite } from '../api/favorites';

export const useGetMyFavoritesQuery = (userId, page) => {
  return useQuery({
    queryKey: queryKeys.boardController.favorites(userId, page),
    queryFn: (signal) => getMyFavorites(signal),
    select: ({ data, pages }) => {
      return { data, pages };
    },
    placeholderData: keepPreviousData
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

export const useFavoritePrefetchQuery = (userId) => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: queryKeys.boardController.favorites(userId, 1),
    queryFn: getMyFavorites
  });
};
