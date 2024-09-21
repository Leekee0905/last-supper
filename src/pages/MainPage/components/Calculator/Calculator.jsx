import React, { useEffect } from 'react';
import Modal from '../Modal/Modal';
import DateForm from './DateForm'; // DateForm 컴포넌트
import RankTags from './RankTags'; // RankTags 컴포넌트
import ProcessBar from './ProcessBar'; // ProcessBar 컴포넌트
import EventTimeline from './EventTimeline'; // EventTimeline 컴포넌트
import { FaArrowCircleRight } from 'react-icons/fa';
import useCalculatorStore from '../../../../store/useCalculatorStore'; 

const serviceDurations = {
  army: 18,
  navy: 20,
  airForce: 21,
  marines: 18,
};

const Calculator = () => {
  const { branch, enlistmentDate, dischargeDate, setBranch, setEnlistmentDate, setDischargeDate } = useCalculatorStore();
  const [currentRank, setCurrentRank] = React.useState('이병');
  const [progress, setProgress] = React.useState(0);
  const [events, setEvents] = React.useState([]);

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

  const calculateRankEvents = () => {
    if (!enlistmentDate) return;
  
    const enlistment = new Date(enlistmentDate);
  
    const updatedEvents = ranks.map((rank) => {
      const eventDate = new Date(enlistment);
      eventDate.setMonth(enlistment.getMonth() + rank.months);
      eventDate.setDate(1); // 진급일은 항상 1일로 설정
  
      return {
        date: eventDate.toLocaleDateString(),
        title: rank.label,
        message:
          rank.label === '전역'
            ? '전역을 명 받았기에 이에 신고!! 하기도 귀찮아. 뒤도 안돌아 볼거야!'
            : `진급: ${rank.label}, 군 생활 진행 중`,
      };
    });
  
    setEvents(updatedEvents);
  };

  useEffect(() => {
    if (enlistmentDate) {
      calculateDischargeDate();
      calculateRankProgress();
      calculateRankEvents(); // 진급 일정 계산
    }
  }, [enlistmentDate, branch]);

  return (
    <div>
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
        <EventTimeline events={events} />
      </div>
    </div>
  );
};

export default Calculator;