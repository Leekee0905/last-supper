import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import queryKeys from '../queryKeys';
import { getMyActivities, removeMyActivity } from '../../../api/MyActivitesApi';

export const useGetMyActivitiesQuery = (type, userId, page) => {
  return useQuery({
    queryKey: queryKeys.boardController.MyActivity(type, userId, page),
    queryFn: (signal) => getMyActivities(signal),
    select: ({ data, pages: totalPages }) => {
      return { data, totalPages };
    },
    placeholderData: keepPreviousData,
    suspense: true
  });
};

export const useMyActivityRemoveMutate = (type) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (logId) => removeMyActivity(type, logId),
    onSuccess: () => {
      queryClient.invalidateQueries(type);
    }
  });
};

// prefetch 함수
export const useMyActivitiesPrefetchQuery = (userId) => {
  const queryClient = useQueryClient();

  const prefetchMyActivities = async (type) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.boardController.MyActivity(type, userId, 1),
      queryFn: getMyActivities
    });
  };

  return prefetchMyActivities;
};
