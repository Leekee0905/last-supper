const queryKeys = {
  boardController: {
    favorites: (userId, page) => ['favorites', userId, page],
    reviews: (userId, page) => ['reviews', userId, page]
  }
};

export default queryKeys;
