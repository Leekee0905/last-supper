import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import queryKeys from '../queryKeys';
import { getMyReviews } from '../../../api/reviews';

export const useGetMyReviewsQuery = (userId, page, type) => {
  return useQuery({
    queryKey: queryKeys.boardController.reviews(userId, page),
    queryFn: (signal) => getMyReviews(signal),
    select: ({ data, pages: totalPages }) => {
      return { data, totalPages };
    },
    placeholderData: keepPreviousData,
    suspense: true
  });
};

// prefetch 함수
export const useReviewsPrefetchQuery = (userId) => {
  const queryClient = useQueryClient();

  const prefetchReviews = async () => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.boardController.reviews(userId, 1),
      queryFn: getMyReviews
    });
  };

  return prefetchReviews;
};
