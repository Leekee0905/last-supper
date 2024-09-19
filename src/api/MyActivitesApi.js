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

// 리뷰 및 즐겨찾기 조회 api
export const getMyActivity = async (queryKey) => {
  const res = await jsonApi.get(`/${queryKey}`);
  return res.data;
};

// 즐겨찾기, 리뷰 추가 api
export const addMyActivity = async ({ queryKey, post }) => {
  await jsonApi.post(`/${queryKey}`, post);
};

// 리뷰 수정 api
export const updateMyActivity = async ({ queryKey, id, content }) => {
  await jsonApi.patch(`${queryKey}/${id}`, {
    review: content
  });
};

// 즐겨찾기 수정 api
// export const updateFavorite = async ({ queryKey, id, content }) => {
//   console.log(queryKey, id, content, 'api 전달받은 값 확인');
//   await jsonApi.patch(`${queryKey}/${id}`, {
//     favorite: !content
//   });
// };

// 즐겨찾기, 리뷰 삭제 api
export const removeMyActivity = async ({ queryKey, id }) => {
  await jsonApi.delete(`/${queryKey}/${id}`);
};
