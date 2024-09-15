import axios from 'axios';

const REVIEWS_URL = 'http://localhost:4000/reviews';

const reviews_api = axios.create({
  baseURL: REVIEWS_URL
});

// 유저가 리뷰를 작성한 식당들 불러오기
export const getMyReviews = async ({ queryKey, signal }) => {
  const [_, userId, page] = queryKey;
  const { data } = await reviews_api.get(`?userId=${userId}`, {
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

// 리뷰 추가하기
export const createReview = async (data) => {
  await reviews_api.post(data);
};

// 리뷰 삭제하기
export const deleteReview = async (id) => {
  await reviews_api.delete(`/${id}`);
};
