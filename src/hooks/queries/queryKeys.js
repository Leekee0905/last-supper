const queryKeys = {
  boardController: {
    MyActivity: (queryKey, userId, page) => [queryKey, userId, page]
  },
  user: {
    token: ['token']
  }
};

export default queryKeys;

export const FAVORITES_QUERY_KEY = 'favorites';
export const REVIEWS_QUERY_KEY = 'reviews';
