import React from 'react';
import { useAlertStore } from '../../store/useAlertStore';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const Alert = () => {
  const alerts = useAlertStore((state) => state.alerts);

  const borderClasses = {
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-yellow-500',
    default: 'border-blue-500',
  };

  const iconClasses = {
    success: <FaCheckCircle className="text-green-500 animate-bounce" />,
    error: <FaExclamationCircle className="text-red-500 animate-bounce" />,
    warning: <FaExclamationTriangle className="text-yellow-500 animate-bounce" />,
    default: <FaInfoCircle className="text-blue-500 animate-bounce" />,
  };

  return (
    <div className="fixed top-0 right-0 p-4 z-[60]">
      {alerts.map((alert) => {
        const borderClass = borderClasses[alert.type] || borderClasses.default;
        const icon = iconClasses[alert.type] || iconClasses.default;

        return (
          <div
            key={alert.id}
            className={`bg-white border-l-4 p-4 mb-4 rounded-md shadow-lg ${borderClass} transition-transform transform hover:scale-105`}
          >
            <div className="flex items-center">
              <div className="mr-2">{icon}</div>
              <span>{typeof alert.message === 'string' ? alert.message : alert.message?.text || '알림 메시지 없음'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const AlertProvider = ({ children }) => {
  return (
    <>
      {children}
      <Alert />
    </>
  );
};