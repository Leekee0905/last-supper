import { create } from 'zustand';

const useModalStore = create((set) => ({
  hasOpen: true,
  setHasOpen: () => set((state) => ({ hasOpen: !state.hasOpen }))
}));

export default useModalStore;
