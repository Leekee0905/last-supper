import React, { useEffect, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import useCalculatorStore from '../../../../store/useCalculatorStore';

const serviceDurations = {
  army: 18,
  navy: 20,
  airForce: 21,
  marines: 18,
};

const EventTimeline = () => {
  const { branch, enlistmentDate } = useCalculatorStore();
  const [events, setEvents] = useState([]);

  const ranks = [
    { label: '이병', months: 0, message: '여기가 군대구나!! 아 힘들어. 집에 가고 싶어. 눈뜨면 집이면 좋겠다.' },
    { label: '일병', months: 2, message: '첫 진급..신난다. 먼가 어깨에 힘이 들어가는걸?' },
    { label: '상병', months: 8, message: '벌써 내가 이만큼 군생활을 하다니.. 시간 빨리가는구나.' },
    { label: '병장', months: 15, message: '아무것도 하기 싫다. 이미 아무것도 하고 있지 않지만....' },
    { label: '전역', months: serviceDurations[branch], message: '전역을 명 받았기에 이에 신고!! 하기도 귀찮아. 뒤도 안돌아 볼거야!' },
  ];

  const calculateEvents = () => {
    if (!enlistmentDate) return;

    const enlistment = new Date(enlistmentDate);

    // 입대일을 기준으로 각 진급일 및 전역일 계산
    const eventUpdates = ranks.map((rank) => {
      const eventDate = new Date(enlistment);
      eventDate.setMonth(enlistment.getMonth() + rank.months);
      const formattedDate = eventDate.toLocaleDateString();

      return {
        date: formattedDate,
        title: rank.label,
        message: rank.message,
      };
    });

    setEvents(eventUpdates);
  };

  useEffect(() => {
    if (enlistmentDate) {
      calculateEvents();
    }
  }, [enlistmentDate, branch]);

  return (
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
  );
};

export default EventTimeline;