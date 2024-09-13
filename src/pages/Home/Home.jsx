import React from 'react';
import Search from './components/search';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">어디로 입대하세요?</h1>
      <Search />
    </div>
  );
};

export default Home;
