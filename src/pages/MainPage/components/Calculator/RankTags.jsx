import React from 'react';

const RankTags = ({ rank }) => {
  const ranks = [
    { label: '이병', date: '입대 시' },
    { label: '일병', date: '입대 후 2개월' },
    { label: '상병', date: '입대 후 8개월' },
    { label: '병장', date: '입대 후 15개월' }
  ];

  return (
    <div className="flex flex-col gap-2">
      {ranks.map(({ label, date }) => (
        <div
          key={label}
          className={`p-2 rounded-lg ${label === rank ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          <span className="font-semibold">{label}</span> - {date}
        </div>
      ))}
    </div>
  );
};

export default RankTags;
