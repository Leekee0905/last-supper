import React from 'react';

const RankTags = ({ enlistmentDate }) => {
  const ranks = [
    { label: '이병', months: 0 },
    { label: '일병', months: 2 },
    { label: '상병', months: 8 },
    { label: '병장', months: 15 }
  ];

  // NOTE calculator.jsx에서 동일한 로직
  const calculateElapsedMonths = () => {
    if (!enlistmentDate) return 0;

    const today = new Date();
    const enlistment = new Date(enlistmentDate);
    const diffInTime = today - enlistment;
    const diffInMonths = Math.floor(diffInTime / (1000 * 60 * 60 * 24 * 30));

    return diffInMonths;
  };

  const elapsedMonths = calculateElapsedMonths();

  return (
    <div className="flex flex-col items-center gap-2">
      {ranks.map(({ label, months }) => (
        <div
          key={label}
          className={`p-4 rounded-lg shadow-md transition duration-300 
            ${
              months <= elapsedMonths
                ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          style={{ width: '752px' }}
        >
          <span className="font-semibold">{label}</span> - 입대 후 {months}개월
        </div>
      ))}
    </div>
  );
};

export default RankTags;
