import { create } from 'zustand';

const useAlertStore = create((set) => ({
  alerts: [],
  timeoutIds: new Map(),

  addAlert: (message, type = 'info') => {
    const id = Date.now();
    
    // 새 알럿 추가
    set((prevState) => {
      // 기존 타이머가 존재하는 경우 클리어
      const existingTimeoutId = prevState.timeoutIds.get(id);
      if (existingTimeoutId) {
        clearTimeout(existingTimeoutId);
      }

      const newTimeoutIds = new Map(prevState.timeoutIds);
      newTimeoutIds.set(id, null); // 타이머 ID를 추가 (초기값 null)

      return {
        alerts: [...prevState.alerts, { id, message, type }],
        timeoutIds: newTimeoutIds,
      };
    });

    // 3초 후에 자동으로 삭제
    const timeoutId = setTimeout(() => {
      set((prevState) => {
        const newTimeoutIds = new Map(prevState.timeoutIds);
        newTimeoutIds.delete(id); // 삭제 후 타이머 맵에서도 제거
        return {
          alerts: prevState.alerts.filter(alert => alert.id !== id),
          timeoutIds: newTimeoutIds,
        };
      });
    }, 3000);

    // 타이머를 맵에 저장
    set((prevState) => {
      const newTimeoutIds = new Map(prevState.timeoutIds);
      newTimeoutIds.set(id, timeoutId); // 실제 타이머 ID 저장
      return { timeoutIds: newTimeoutIds };
    });
  },

  clearAlerts: () => {
    const state = useAlertStore.getState();
    state.timeoutIds.forEach(timeoutId => clearTimeout(timeoutId)); // 모든 타이머 클리어
    set({ alerts: [], timeoutIds: new Map() }); // 알럿과 타이머 맵 초기화
  }
}));

export { useAlertStore };