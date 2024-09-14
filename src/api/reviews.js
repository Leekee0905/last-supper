import axios from 'axios';

const reviews_api = axios.create({
  baseURL: 'http://localhost:4000/reviews'
});

// 유저가 리뷰를 작성한 식당들 불러오기
export const getMyReviews = async ({ queryKey, signal }) => {
  const [_, userId] = queryKey;
  const { data } = await reviews_api.get(`?userId=${userId}`, { signal });
  return data;
};

// 리뷰 추가하기
export const createReview = async (data) => {
  await reviews_api.post(data);
};

// 리뷰 삭제하기
export const deleteReview = async (id) => {
  await reviews_api.delete(`/${id}`);
};

