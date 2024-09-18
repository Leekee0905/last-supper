import React, { useState } from 'react';
import Modal from '../Modal/Modal'; // 모달 컴포넌트
import { FaArrowCircleRight } from 'react-icons/fa';

const serviceDurations = {
  army: 18, // 육군: 18개월
  navy: 20, // 해군: 20개월
  airForce: 21, // 공군: 21개월
  marines: 18, // 해병대: 18개월
};

const events = [
  { date: '2024-09-19', title: '입대', message: '여기가 군대구나!! 아 힘들어. 집에 가고 싶어. 눈뜨면 집이면 좋겠다.' },
  { date: '2024-12-01', title: '일병 진급', message: '첫 진급..신난다. 먼가 어깨에 힘이 들어가는걸?' },
  { date: '2025-06-01', title: '상병 진급', message: '벌써 내가 이만큼 군생활을 하다니.. 시간 빨리가는구나.' },
  { date: '2025-12-01', title: '병장 진급', message: '아무것도 하기 싫다. 이미 아무것도 하고 있지 않지만....' },
  { date: '2026-03-18', title: '전역', message: '전역을 명 받았기에 이에 신고!! 하기도 귀찮아. 뒤도 안돌아 볼거야!' },
];

const Calculator = () => {
  const [branch, setBranch] = useState('army'); // 기본값: 육군
  const [enlistmentDate, setEnlistmentDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');

  const calculateDischargeDate = () => {
    const enlistment = new Date(enlistmentDate);
    const serviceMonths = serviceDurations[branch];

    // 입대 날짜에 복무 기간을 더해 전역일 계산
    enlistment.setMonth(enlistment.getMonth() + serviceMonths);
    setDischargeDate(enlistment.toLocaleDateString());
  };

  return (
    <Modal>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">군별 전역일 계산기</h2>

        {/* 군 선택과 입대 날짜 입력 폼 */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">
              군 선택:
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="block w-full mt-2 p-2 border rounded"
              >
                <option value="army">육군</option>
                <option value="navy">해군</option>
                <option value="airForce">공군</option>
                <option value="marines">해병대</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block font-semibold">
              입대 날짜:
              <input
                type="date"
                value={enlistmentDate}
                onChange={(e) => setEnlistmentDate(e.target.value)}
                className="block w-full mt-2 p-2 border rounded"
              />
            </label>
          </div>

          <button
            onClick={calculateDischargeDate}
            className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          >
            전역일 계산
          </button>
        </div>

        {/* 전역일 결과 */}
        {dischargeDate && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">전역일: {dischargeDate}</h3>
          </div>
        )}

        {/* 연혁 표시 (군 복무 일정) */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">군 복무 일정</h3>
          <ul className="space-y-4 max-h-60 overflow-y-auto">
            {events.map((event) => (
              <li key={event.date} className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-semibold">{event.date}</h4>
                <p className="font-semibold mt-1">{event.title}</p>
                <p className="text-gray-700 mt-2">{event.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default Calculator;