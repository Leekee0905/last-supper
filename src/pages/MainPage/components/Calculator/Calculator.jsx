import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import DateForm from './DateForm';
import RankTags from './RankTags';
import ProcessBar from './ProcessBar';
import EventTimeline from './EventTimeline';
import useCalculatorStore from '../../../../store/useCalculatorStore';

const Calculator = () => {
  const { branch, enlistmentDate, dischargeDate, setBranch, setEnlistmentDate, setDischargeDate } = useCalculatorStore();
  const [currentRank, setCurrentRank] = useState('이병');
  const [progress, setProgress] = useState(0);

  const serviceDurations = {
    army: 18,
    navy: 20,
    airForce: 21,
    marines: 18,
  };

  const calculateDischargeDate = () => {
    if (!enlistmentDate) return;
    const enlistment = new Date(enlistmentDate);
    const serviceMonths = serviceDurations[branch];
    enlistment.setMonth(enlistment.getMonth() + serviceMonths);
    setDischargeDate(enlistment.toLocaleDateString());
  };

  const ranks = [
    { label: '이병', months: 0 },
    { label: '일병', months: 2 },
    { label: '상병', months: 8 },
    { label: '병장', months: 15 },
    { label: '전역', months: serviceDurations[branch] },
  ];

  const calculateRankProgress = () => {
    const today = new Date();
    const enlistment = new Date(enlistmentDate);
    const totalServiceMonths = serviceDurations[branch];
    const elapsedMonths = Math.floor((today - enlistment) / (1000 * 60 * 60 * 24 * 30));

    let newRank = '이병';
    for (let i = 0; i < ranks.length - 1; i++) {
      if (elapsedMonths >= ranks[i].months && elapsedMonths < ranks[i + 1].months) {
        newRank = ranks[i].label;
        break;
      }
    }
    setCurrentRank(newRank);
    setProgress((elapsedMonths / totalServiceMonths) * 100);
  };

  useEffect(() => {
    if (enlistmentDate) {
      calculateDischargeDate();
      calculateRankProgress();
    }
  }, [enlistmentDate, branch]);

  return (
    <div className="flex flex-col md:flex-row p-6 md:p-10 bg-gray-100 rounded-lg shadow-lg max-w-full md:max-w-7xl mx-auto">
      <div className="w-full md:w-1/3 pr-4 md:pr-8 flex items-center">
        <EventTimeline />
      </div>

      <div className="mt-10 w-full md:w-2/3 bg-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-center" style={{ height: '625px' }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 transition-colors duration-300 hover:text-blue-600">군별 전역일 계산기</h2>

        <DateForm
          branch={branch}
          setBranch={setBranch}
          enlistmentDate={enlistmentDate}
          setEnlistmentDate={setEnlistmentDate}
          calculateDischargeDate={calculateDischargeDate}
        />

        {dischargeDate && (
          <div className="mt-8 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
              전역일: <span className="text-blue-600">{dischargeDate}</span>
            </h3>
          </div>
        )}

        <div className="mt-8 flex flex-col items-start w-full"> 
          <ProcessBar progress={progress} className="w-full" />
          <RankTags rank={currentRank} enlistmentDate={enlistmentDate} branch={branch} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;