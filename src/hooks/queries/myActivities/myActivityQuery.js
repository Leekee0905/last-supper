import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import queryKeys from '../queryKeys';
import { getMyActivities, removeMyActivity, updateMyActivity } from '../../../api/myActivitesApi';

// 내 활동 데이터 불러오기
export const useGetMyActivitiesQuery = (type, userId, page) => {
  return useQuery({
    queryKey: queryKeys.boardController.MyActivity(type, userId, page),
    queryFn: (signal) => getMyActivities(signal),
    select: ({ data, pages: totalPages }) => {
      return { data, totalPages };
    },
    placeholderData: keepPreviousData,
    suspense: true,
    onError: (error) => alert(error.response.data.message)
  });
};

// 내 활동 삭제 mutation
export const useMyActivityRemoveMutate = (queryKey) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetId) => removeMyActivity({ queryKey, id: targetId }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => alert(error.response.data.message)
  });
};

// 내 활동 수정 mutation
export const useMyActivityUpdateMutate = (queryKey) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }) => updateMyActivity({ queryKey, id, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => alert(error.response.data.message)
  });
};

// 내 활동 prefetch
export const useMyActivitiesPrefetchQuery = (userId) => {
  const queryClient = useQueryClient();

  const prefetchMyActivities = async (queryKey) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.boardController.MyActivity(queryKey, userId, 1),
      queryFn: getMyActivities,
      onError: (error) => alert(error.response.data.message)
    });
  };

  return prefetchMyActivities;
};
