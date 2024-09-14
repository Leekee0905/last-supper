import axios from 'axios';

const favorites_api = axios.create({
  baseURL: 'http://localhost:4000/favorites'
});

// 즐겨찾기한 가게 불러오기
export const getMyFavorites = async ({ queryKey, signal }) => {
  const [_, userId] = queryKey;
  const { data } = await favorites_api.get(`?userId=${userId}`, { signal });
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
