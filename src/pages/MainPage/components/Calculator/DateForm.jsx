import React from 'react';
import useCalculatorStore from '../../../../store/useCalculatorStore';

const DateForm = ({ calculateDischargeDate }) => {
  const { branch, setBranch, enlistmentDate, setEnlistmentDate } = useCalculatorStore();

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
      <div className="flex flex-col md:w-1/3">
        <label className="block font-semibold text-lg text-gray-600">
          군 선택:
        </label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="mt-2 p-2 h-12 border rounded-md text-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="army">육군</option>
          <option value="navy">해군</option>
          <option value="airForce">공군</option>
          <option value="marines">해병대</option>
        </select>
      </div>

      <div className="flex flex-col md:w-1/3">
        <label className="block font-semibold text-lg text-gray-600">
          입대 날짜:
        </label>
        <input
          type="date"
          value={enlistmentDate}
          onChange={(e) => setEnlistmentDate(e.target.value)}
          className="mt-2 p-2 h-12 border rounded-md text-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex md:w-1/3">
        <button
          onClick={calculateDischargeDate}
          className="mt-9 w-full py-3 h-12 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 transition-colors"
        >
          전역일 계산
        </button>
      </div>
    </div>
  );
};

export default DateForm;