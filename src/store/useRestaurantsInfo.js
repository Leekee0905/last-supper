import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useRestaurantsStore = create(
  immer((set) => ({
    info: [],
    setInfo: (data) => set((state) => ({ info: data })),
    deleteInfo: () => set(() => ({ info: [] }))
  }))
);

export default useRestaurantsStore;
