import axios from 'axios';

const FAVORITES_URL = 'http://localhost:4000/favorites';

const favorites_api = axios.create({
  baseURL: FAVORITES_URL
});

// 즐겨찾기한 가게 불러오기
export const getMyFavorites = async ({ queryKey, signal }) => { // 타입 추가
  const [_, userId, page] = queryKey;
  const { data } = await favorites_api.get(`?userId=${userId}`, {
    params: {
      _page: page,
      _per_page: 6
      // _sort: 'id',
      // _order: 'desc'
    },
    signal
  });
  return data;
};

// 즐겨찾기 추가
export const createFavorite = async (resultData) => {
  await favorites_api.post(resultData);
};

// 즐겨찾기 삭제
export const removeFavorite = async (id) => {
  await favorites_api.delete(`/${id}`);
};
