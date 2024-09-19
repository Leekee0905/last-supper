import React from 'react';

const RankTags = ({ enlistmentDate, branch }) => {
  // 계급별 기준 월 수
  const ranks = [
    { label: '이병', months: 0 },
    { label: '일병', months: 2 },
    { label: '상병', months: 8 },
    { label: '병장', months: 15 },
  ];

  // 현재 날짜와 입대 날짜를 비교하여 경과 개월 수 계산
  const calculateElapsedMonths = () => {
    if (!enlistmentDate) return 0;
    
    const today = new Date();
    const enlistment = new Date(enlistmentDate);
    const diffInTime = today - enlistment;
    const diffInMonths = Math.floor(diffInTime / (1000 * 60 * 60 * 24 * 30)); // 개월 수 계산
    
    return diffInMonths;
  };

  const elapsedMonths = calculateElapsedMonths();

  // 현재 계급 결정
  const getCurrentRank = () => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (elapsedMonths >= ranks[i].months) {
        return ranks[i].label;
      }
    }
    return '이병'; // 기본값
  };

  const currentRank = getCurrentRank();

  return (
    <div className="flex flex-col gap-2">
      {ranks.map(({ label, months }) => (
        <div
          key={label}
          className={`p-2 rounded-lg ${months <= elapsedMonths ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          <span className="font-semibold">{label}</span> - 입대 후 {months}개월
        </div>
      ))}
    </div>
  );
};

export default RankTags;