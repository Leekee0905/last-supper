
import React, { useState } from 'react';
import Modal from './Modal/Modal';

const serviceDurations = {
    army: 18, // 육군: 18개월
    navy: 20, // 해군: 20개월
    airForce: 21, // 공군: 21개월
    marines: 18, // 해병대: 18개월
  };

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
      <h2>군별 전역일 계산기</h2>
      <div>
        <label>
          군 선택:
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="army">육군</option>
            <option value="navy">해군</option>
            <option value="airForce">공군</option>
            <option value="marines">해병대</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          입대 날짜:
          <input
            type="date"
            value={enlistmentDate}
            onChange={(e) => setEnlistmentDate(e.target.value)}
          />
        </label>
      </div>

      <button onClick={calculateDischargeDate}>전역일 계산</button>

      {dischargeDate && (
        <div>
          <h3>전역일: {dischargeDate}</h3>
        </div>
      )}
    </Modal>
  );
};

export default Calculator;
