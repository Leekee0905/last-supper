const queryKeys = {
  boardController: {
    favorites: (userId) => ['favorites', userId],
    reviews: (userId) => ['reviews', userId]
  }
};

export default queryKeys;
