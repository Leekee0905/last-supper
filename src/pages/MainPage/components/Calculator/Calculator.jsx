import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import { FaArrowCircleRight } from 'react-icons/fa';
import Sidebar from './Sidebar'; // 사이드바 컴포넌트 import

const serviceDurations = {
  army: 18,
  navy: 20,
  airForce: 21,
  marines: 18
};

const ranks = [
  { name: '이병', duration: 2 },
  { name: '일병', duration: 6 },
  { name: '상병', duration: 6 },
  { name: '병장', duration: 15 }
];

const Calculator = () => {
  const [branch, setBranch] = useState('army');
  const [enlistmentDate, setEnlistmentDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [currentRank, setCurrentRank] = useState('이병');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [rankUpgradeDates, setRankUpgradeDates] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);

  const calculateDischargeDate = () => {
    if (!enlistmentDate) return;

    const enlistment = new Date(enlistmentDate);
    const serviceMonths = serviceDurations[branch];
    const discharge = new Date(enlistment);

    discharge.setMonth(discharge.getMonth() + serviceMonths);
    setDischargeDate(discharge.toLocaleDateString());

    const now = new Date();
    const enlistmentMonth = enlistment.getMonth() + 1;
    const enlistmentYear = enlistment.getFullYear();
    const monthsInService = ((now.getFullYear() - enlistmentYear) * 12 + (now.getMonth() + 1 - enlistmentMonth));

    const rankIndex = ranks.findIndex(rank => monthsInService < rank.duration);
    setCurrentRank(rankIndex === -1 ? '병장' : ranks[rankIndex].name);

    const totalMonths = serviceMonths;
    const progress = Math.min(((monthsInService / totalMonths) * 100), 100);
    setProgressPercentage(progress.toFixed(1));

    const upgradeDates = ranks.reduce((acc, rank, index) => {
      if (rank.name === '이병') return acc;

      const durationMonths = index === 0 ? rank.duration : ranks[index - 1].duration + rank.duration;
      const upgradeDate = new Date(enlistment);
      upgradeDate.setMonth(enlistment.getMonth() + durationMonths);
      upgradeDate.setDate(1);
      acc[rank.name] = upgradeDate.toLocaleDateString();
      return acc;
    }, {});
    setRankUpgradeDates(upgradeDates);
  };

  useEffect(() => {
    calculateDischargeDate();
  }, [branch, enlistmentDate]);

  return (
    <Modal>
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center">군별 전역일 계산기</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            군 선택:
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="army">육군</option>
              <option value="navy">해군</option>
              <option value="airForce">공군</option>
              <option value="marines">해병대</option>
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            입대 날짜:
            <input
              type="date"
              value={enlistmentDate}
              onChange={(e) => setEnlistmentDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>

        <button
          onClick={calculateDischargeDate}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          전역일 계산
        </button>

        {dischargeDate && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">전역일: {dischargeDate}</h3>
            <h3 className="text-lg font-semibold mt-2">현재 계급: {currentRank}</h3>
            <div className="mt-4">
              <h4 className="text-md font-semibold">계급 진급 시점:</h4>
              <ul className="list-disc pl-5 mt-2">
                {Object.keys(rankUpgradeDates).map(rank => (
                  <li key={rank}>
                    <span className="font-medium">{rank}:</span> {rankUpgradeDates[rank]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="relative mt-6 h-4 bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          >
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
            {progressPercentage}%
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          {ranks.map((rank) => (
            <span
              key={rank.name}
              className={`px-3 py-1 rounded-full text-sm font-medium ${currentRank === rank.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {rank.name}
            </span>
          ))}
        </div>

        <div className="relative mt-6 flex justify-center">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
          >
            <FaArrowCircleRight size={30} />
          </button>
        </div>
      </div>

      <Sidebar showSidebar={showSidebar} onClose={() => setShowSidebar(false)} />
    </Modal>
  );
};

export default Calculator;
