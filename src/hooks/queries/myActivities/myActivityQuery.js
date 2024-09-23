import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import queryKeys from '../queryKeys';
import { getMyActivities, removeMyActivity, updateMyActivity, updateReviewNickname } from '../../../api/myActivitesApi';

// 내 활동 데이터 불러오기
export const useGetMyActivitiesQuery = (type, userId, page) => {
  return useQuery({
    queryKey: queryKeys.boardController.MyActivity(type, userId, page),
    queryFn: (signal) => getMyActivities(signal),
    select: ({ data, totalDatas }) => {
      return { data, totalDatas };
    },
    placeholderData: keepPreviousData,
    suspense: true,
    onError: (error) => alert(error.response.data.message)
  });
};

// 내 활동 삭제 mutation
export const useMyActivityRemoveMutate = (queryKey, userId, page) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetId) => removeMyActivity({ queryKey, id: targetId }),
    onError: (error) => {
      alert(error.response.data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, userId] });
      queryClient.invalidateQueries({ queryKey: ['allReviews'] });
    }
  });
};

// 내 활동 수정 mutation
export const useMyActivityUpdateMutate = (queryKey, userId, page) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }) => updateMyActivity({ queryKey, id, content }),
    onMutate: async (newLog) => {
      await queryClient.cancelQueries({ queryKey: [queryKey, userId, page] });

      const { data: preLogs } = queryClient.getQueryData([queryKey, userId, page]);

      queryClient.setQueryData([queryKey, userId, page], ({ data }) => {
         data.map((log) => (log.id === newLog.id ? (log.review = newLog.content) : log));
      });

      return { preLogs };
    },
    onError: (error, _, context) => {
      alert(error.response.data.message);
      queryClient.setQueryData([queryKey, userId, page], context.preLogs);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, userId, page] });
    }
  });
};

// 리뷰 닉네임 수정 mutation
export const useReviewNicknameUpdateMutate = (queryKey, userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ targetId, nickName }) => updateReviewNickname({ queryKey, targetId, nickName }),
    onError: (error) => {
      alert(error.response.data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allReviews'] });
    }
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
