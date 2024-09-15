import { create } from 'zustand';

const useModalStore = create((set) => ({
  hasOpen: false,
  modalType: null,
  setHasOpen: () => set((state) => ({ hasOpen: !state.hasOpen })),
  setModalType: () => set((state) => ({ modalType: '' }))
}));

export default useModalStore;
