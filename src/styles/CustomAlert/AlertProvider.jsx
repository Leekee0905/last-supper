import React from 'react';
import { useAlertStore } from '../../store/usealertStore';
import { FiX } from 'react-icons/fi';
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';

const Alert = () => {
  const { alerts, clearAlerts } = useAlertStore();

  const getAlertStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-white border-l-4 border-green-500 text-gray-800';
      case 'warning':
        return 'bg-white border-l-4 border-yellow-500 text-gray-800';
      case 'error':
        return 'bg-white border-l-4 border-red-500 text-gray-800';
      default:
        return 'bg-white border-l-4 border-blue-500 text-gray-800';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return <AiOutlineCheckCircle className="animate-bounce text-2xl" />;
      case 'warning':
        return <AiOutlineWarning className="animate-pulse scale-110 hover:scale-100 transition-transform duration-300" />;
      case 'error':
        return <FiX className="animate-pulse text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-0 right-0 p-4">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className={`flex items-center ${getAlertStyles(alert.type)} p-4 rounded-md shadow-lg mb-4 transition-all transform duration-500 ease-in-out z-50 hover:scale-105`}
          style={{ width: '500px' }}
        >
          <div className="mr-2 transform transition-transform duration-300 hover:scale-110">
            {getAlertIcon(alert.type)}
          </div>
          <div className="flex-1 text-lg font-semibold transition-all duration-300 transform hover:translate-x-1">
            {alert.message}
          </div>
          <button onClick={() => clearAlerts(alert.id)} className="ml-2 transform hover:scale-125 transition-transform duration-300">
            <FiX />
          </button>
        </div>
      ))}
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

export default AlertProvider;