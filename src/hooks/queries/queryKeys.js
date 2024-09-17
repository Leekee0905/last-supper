const queryKeys = {
  boardController: {
    MyActivity: (type, userId, page) => [type, userId, page]
  },
  user: {
    token: ['token']
  }
};

export default queryKeys;

export const FAVORITES_QUERY_KEY = 'favorites';
export const REVIEWS_QUERY_KEY = 'reviews';
