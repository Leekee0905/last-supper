import React from 'react';
import useCalculatorStore from '../../../../store/useCalculatorStore';
import { useAlertStore } from '../../../../store/useAlertStore';

// 입력 필드와 셀렉트 필드의 공통 스타일을 적용하는 컴포넌트
const FormField = ({ label, children }) => (
  <div className="flex flex-col md:w-1/3">
    <label className="block font-semibold text-lg text-gray-600">{label}</label>
    {children}
  </div>
);

// InputField 컴포넌트
const InputField = ({ type, value, onChange }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className="mt-2 p-2 h-12 border rounded-md text-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
  />
);

// SelectField 컴포넌트
const SelectField = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    className="mt-2 p-2 h-12 border rounded-md text-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const DateForm = () => {
  const { branch, setBranch, enlistmentDate, setEnlistmentDate } = useCalculatorStore();
  const addAlert = useAlertStore((state) => state.addAlert); // 여기서 스토어 사용

  const handleCalculateDischargeDate = () => {
    if (!enlistmentDate || !branch) {
      addAlert({
        message: '입대 날짜와 군 선택이 필요합니다!',
        type: 'warning'
      });
      return;
    }

    addAlert({
      message: '전역일이 계산되었습니다!',
      type: 'success'
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
        <FormField label="군 선택:">
          <SelectField
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            options={[
              { label: '육군', value: 'army' },
              { label: '해군', value: 'navy' },
              { label: '공군', value: 'airForce' },
              { label: '해병대', value: 'marines' }
            ]}
          />
        </FormField>

        <FormField label="입대 날짜:">
          <InputField type="date" value={enlistmentDate} onChange={(e) => setEnlistmentDate(e.target.value)} />
        </FormField>

        <div className="flex md:w-1/3">
          <button
            onClick={handleCalculateDischargeDate}
            className="mt-9 w-full py-3 h-12 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 transition-colors"
          >
            전역일 계산
          </button>
        </div>
      </div>
    </>
  );
};

export default DateForm;
