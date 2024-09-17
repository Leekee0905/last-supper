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

// 즐겨찾기, 리뷰 추가
export const addMyActivity = async (type, resultData) => {
  await jsonApi.post(`/${type}/${resultData}`);
};

// 즐겨찾기, 리뷰 삭제
export const removeMyActivity = async (type, id) => {
  await jsonApi.delete(`/${type}/${id}`);
};
