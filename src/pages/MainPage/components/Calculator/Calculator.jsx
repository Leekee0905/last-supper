import React, { useEffect } from 'react';
import Modal from '../Modal/Modal';
import DateForm from './DateForm'; // DateForm 컴포넌트
import RankTags from './RankTags'; // RankTags 컴포넌트
import ProcessBar from './ProcessBar'; // ProcessBar 컴포넌트
import { FaArrowCircleRight } from 'react-icons/fa';
import  useCalculatorStore  from '../../../../store/useCalculatorStore'; 

const serviceDurations = {
  army: 18,
  navy: 20,
  airForce: 21,
  marines: 18,
};

const events = [
  { date: 'null', title: '입대', message: '여기가 군대구나!! 아 힘들어. 집에 가고 싶어. 눈뜨면 집이면 좋겠다.' },
  { date: 'null', title: '일병 진급', message: '첫 진급..신난다. 먼가 어깨에 힘이 들어가는걸?' },
  { date: 'null', title: '상병 진급', message: '벌써 내가 이만큼 군생활을 하다니.. 시간 빨리가는구나.' },
  { date: 'null', title: '병장 진급', message: '아무것도 하기 싫다. 이미 아무것도 하고 있지 않지만....' },
  { date: 'null', title: '전역', message: '전역을 명 받았기에 이에 신고!! 하기도 귀찮아. 뒤도 안돌아 볼거야!' },
];

const Calculator = () => {
  const { branch, enlistmentDate, dischargeDate, setBranch, setEnlistmentDate, setDischargeDate } = useCalculatorStore();
  const [currentRank, setCurrentRank] = React.useState('이병');
  const [progress, setProgress] = React.useState(0);

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
    
    const elapsedMonths = Math.floor((today - enlistment) / (1000 * 60 * 60 * 24 * 30)); // 경과 개월 수

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
    <Modal>
      <div className="p-4 md:p-8 bg-white rounded-lg shadow-lg max-w-full md:max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">군별 전역일 계산기</h2>

        {/* DateForm 컴포넌트 */}
        <DateForm
          branch={branch}
          setBranch={setBranch}
          enlistmentDate={enlistmentDate}
          setEnlistmentDate={setEnlistmentDate}
          calculateDischargeDate={calculateDischargeDate}
        />

        {/* 전역일 결과 */}
        {dischargeDate && (
          <div className="mt-8 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
              전역일: <span className="text-blue-600">{dischargeDate}</span>
            </h3>
          </div>
        )}

        {/* RankTags 및 ProcessBar 컴포넌트 */}
        <div className="mt-8">
          <RankTags rank={currentRank} enlistmentDate={enlistmentDate} branch={branch} />
          <ProcessBar progress={progress} />
        </div>

        {/* 연혁 표시 (군 복무 일정) */}
        <div className="mt-10">
          <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-700">군 복무 일정</h3>
          <ul className="space-y-6 max-h-96 md:max-h-120 overflow-y-auto border-t border-gray-200 pt-4">
            {events.map(({ date, title, message }) => (
              <li key={title} className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md md:text-lg font-semibold text-gray-700">{date}</h4>
                    <p className="text-sm md:text-md font-semibold mt-1 text-blue-500">{title}</p>
                    <p className="text-gray-600 mt-2">{message}</p>
                  </div>
                  <FaArrowCircleRight className="text-blue-500" size={24} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default Calculator;