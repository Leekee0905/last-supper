import {useAlertStore}  from '../../../store/alertStore';

const useAlert = () => {
  const { addAlert, clearAlerts } = useAlertStore();

  const showAlert = (message, type = 'info') => {
    addAlert(message, type); // 메시지와 타입을 전달
  };

  return { showAlert, clearAlerts };
};

export default useAlert;