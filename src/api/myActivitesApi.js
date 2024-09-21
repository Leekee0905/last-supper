import { jsonApi } from './apiInstance';

// 즐겨찾기 추가나 리뷰를 작성한 가게들 불러오기
export const getMyActivities = async ({ queryKey, signal }) => {
  const [target, userId, page] = queryKey;
  const { data } = await jsonApi.get(`/${target}`, {
    params: {
      userId: userId,
      _page: page,
      _per_page: 6
      // _sort: 'date',
      // _order: 'desc'
    },
    signal
  });
  return data;
};

// 리뷰 및 즐겨찾기 조회 api
export const getMyActivity = async (queryKey) => {
  const res = await jsonApi.get(`/${queryKey}`);
  return res.data;
};

// 즐겨찾기, 리뷰 추가 api
export const addMyActivity = async ({ queryKey, post }) => {
  await jsonApi.post(`/${queryKey}`, post);
};

// 즐겨찾기, 리뷰 삭제 api
export const removeMyActivity = async ({ queryKey, id }) => {
  await jsonApi.delete(`/${queryKey}/${id}`);
};

// 리뷰 수정 api
export const updateMyActivity = async ({ queryKey, id, content }) => {
  await jsonApi.patch(`${queryKey}/${id}`, {
    review: content
  });
};
