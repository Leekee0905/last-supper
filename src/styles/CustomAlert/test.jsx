import React from 'react';
import { useAlertStore } from '../../store/usealertStore';
import Alert from './AlertProvider'; // Alert 컴포넌트 임포트

const TestPage = () => {
  const { addAlert } = useAlertStore();

  const handleShowAlert = (message, type) => {
    addAlert(message, type);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">알림 테스트 페이지</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => handleShowAlert('작업이 성공적으로 완료되었습니다!', 'success')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          성공 알림
        </button>
        <button
          onClick={() => handleShowAlert('주의: 이 작업은 위험할 수 있습니다!', 'warning')}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          경고 알림
        </button>
        <button
          onClick={() => handleShowAlert('오류가 발생했습니다. 다시 시도해 주세요.', 'error')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          오류 알림
        </button>
      </div>
      <Alert /> {/* 알림 컴포넌트 추가 */}
    </div>
  );
};

export default TestPage;
