import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from './queryKeys';
import { getMyReviews } from '../api/reviews';

export const useGetMyReviewsQuery = (userId) => {
  return useQuery({
    queryKey: queryKeys.boardController.reviews(userId),
    queryFn: getMyReviews
  });
};
