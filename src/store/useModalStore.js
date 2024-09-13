import { create } from 'zustand';

const useModalStore = create((set) => ({
  hasSidebarOpen: false,
  hasCalculatorOpen: false,
  setHasSidebarOpen: () => set((state) => ({ hasOpen: !state.hasSidebarOpen })),
  setHasCalculatorOpen: (isOpen) => set(() => ({ hasCalculatorOpen: isOpen })),
}));

export default useModalStore;