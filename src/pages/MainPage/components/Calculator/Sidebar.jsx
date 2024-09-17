import React, { useState } from 'react';
import { FaArrowCircleRight, FaTimes } from 'react-icons/fa'; // 아이콘 추가

const events = [
  { date: '2024-09-19', title: '입대', message: '여기가 군대구나!! 아 힘들어. 집에 가고 싶어. 눈뜨면 집이면 좋겠다.' },
  { date: '2024-12-01', title: '일병 진급', message: '첫 진급..신난다. 먼가 어깨에 힘이 들어가는걸?' },
  { date: '2025-06-01', title: '상병 진급', message: '벌써 내가 이만큼 군생활을 하다니.. 시간 빨리가는구나.' },
  { date: '2025-12-01', title: '병장 진급', message: '아무것도 하기싫다. 이미 아무것도 하고 있지 않지만....' },
  { date: '2026-03-18', title: '전역', message: '전역을 명 받았기에 이에 신고!! 하기도 귀찮아. 뒤도 안돌아 볼거야!' }
];

const Sidebar = ({ showSidebar, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-80 bg-white shadow-lg h-full z-50 transition-transform transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
      >
        <FaTimes size={24} />
      </button>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">군 복무 일정</h2>
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event.date} className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold">{event.date}</h3>
              <p className="text-md font-semibold mt-1">{event.title}</p>
              <p className="text-gray-700 mt-2">{event.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
