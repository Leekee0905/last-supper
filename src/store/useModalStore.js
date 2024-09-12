import { create } from 'zustand';

const useModalStore = create((set) => ({
  hasOpen: false,
  setHasOpen: () => set((state) => ({ hasOpen: !state.hasOpen }))
}));

export default useModalStore;
