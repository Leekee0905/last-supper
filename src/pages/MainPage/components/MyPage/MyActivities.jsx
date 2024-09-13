import React from 'react';

const MyActivities = ({ favorites }) => {
  return (
    <>
      <h3>{favorites ? '즐겨찾기' : '내 리뷰'}</h3>
      <main>{favorites}</main>
    </>
  );
};

export default MyActivities;
