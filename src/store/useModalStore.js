import { create } from 'zustand';

const useModalStore = create((set) => ({
  hasOpen: false,
  modalType: null,
  setHasOpen: (hasOpen) => set((state) => ({ hasOpen: hasOpen })),
  setModalType: (type) => set((state) => ({ modalType: type }))
}));

export default useModalStore;
