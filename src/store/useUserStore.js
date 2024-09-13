import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: {},
  hasAuthenticated: false,
  setUser: (userData) => set({ user: userData }),
  setHasAuthenticated: (hasAuthenticated) => set({ hasAuthenticated: hasAuthenticated })
}));

export default useUserStore;
