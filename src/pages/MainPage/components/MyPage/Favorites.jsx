import React from 'react';
import { useGetMyFavoritesQuery } from '../../../../queries/favoritesQuery';

const Favorites = () => {
  const { data: myFavorites, isError } = useGetMyFavoritesQuery('user123');

  if (isError) {
    return <p>오류가 발생했습니다.</p>;
  }

  return (
    <ul>
      {myFavorites.map((store) => {
        return (
          <li key={store.storeId}>
            <h4>{store.storeName}</h4>
            <p>{store.storeAddress}</p>
            <p>{store.storeCall}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Favorites;
