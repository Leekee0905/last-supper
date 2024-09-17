import { create } from 'zustand';

const useRestaurantsStore = create((set) => ({
  info: [],
  setInfo: (data) => set(() => ({ info: data })),
  deleteInfo: () => set(() => ({ info: [] }))
}));

export default useRestaurantsStore;
