import axios from 'axios';
import { jsonApi } from './apiInstance';

// 즐겨찾기 추가나 리뷰를 작성한 가게들 불러오기
export const getMyActivities = async ({ queryKey, signal }) => {
  const [target, userId, page] = queryKey;
  const { data } = await jsonApi.get(`/${target}`, {
    params: {
      userId: userId,
      _page: page,
      _per_page: 6
      // _sort: 'id',
      // _order: 'desc'
    },
    signal
  });
  return data;
};

// 즐겨찾기, 리뷰 추가 api
export const addMyActivity = async (queryKey, resultData) => {
  await jsonApi.post(`/${queryKey}/${resultData}`);
};

// 즐겨찾기, 리뷰 삭제 api
export const removeMyActivity = async (queryKey, id) => {
  await jsonApi.delete(`/${queryKey}/${id}`);
};

// 리뷰 추가 api
export const addReview = async (post) => {
  await jsonApi.post(`/reviews/${post}`);
};
