import { create } from 'zustand';

const useRestaurantsStore = create((set) => ({
  info: [],
  isOpen: false,
  setInfo: (data) => set(() => ({ info: data })),
  deleteInfo: () => set(() => ({ info: [] })),
  setIsOpen: (isOpen) => set(() => ({ isOpen: isOpen }))
}));

export default useRestaurantsStore;
