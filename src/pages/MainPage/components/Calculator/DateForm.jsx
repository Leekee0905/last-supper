import React from 'react';
import useCalculatorStore from '../../../../store/useCalculatorStore';

const DateForm = ({ calculateDischargeDate }) => {
  const { branch, setBranch, enlistmentDate, setEnlistmentDate } = useCalculatorStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <label className="block font-semibold text-lg text-gray-600">
          군 선택:
        </label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="block w-full md:w-1/2 mt-2 p-2 border rounded-md text-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="army">육군</option>
          <option value="navy">해군</option>
          <option value="airForce">공군</option>
          <option value="marines">해병대</option>
        </select>
      </div>

      <div className="flex flex-col items-center">
        <label className="block font-semibold text-lg text-gray-600">
          입대 날짜:
        </label>
        <input
          type="date"
          value={enlistmentDate}
          onChange={(e) => setEnlistmentDate(e.target.value)}
          className="block w-full md:w-1/2 mt-2 p-2 border rounded-md text-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={calculateDischargeDate}
        className="w-full py-3 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 transition-colors"
      >
        전역일 계산
      </button>
    </div>
  );
};

export default DateForm;
