import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import queryKeys from '../queryKeys';
import { getMyReviews } from '../../../api/reviews';

export const useGetMyReviewsQuery = (userId) => {
  return useQuery({
    queryKey: queryKeys.boardController.reviews(userId),
    queryFn: (signal) => getMyReviews(signal),
    select: ({ data: response, pages: totalPages }) => {
      return { response, totalPages };
    },
    placeholderData: keepPreviousData
  });
};

// export const useReviewsPrefetchQuery = (userId) => {
//   const queryClient = useQueryClient();
//   const prefetchData = queryClient.prefetchQuery({
//     queryKey: queryKeys.boardController.reviews(userId, 1),
//     queryFn: getMyReviews
//   });
//   return { prefetchData };
// };
