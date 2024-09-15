import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      hasAuthenticated: false,
      setUser: (userData) => set({ user: userData }),
      setHasAuthenticated: (hasAuthenticated) => set({ hasAuthenticated: hasAuthenticated })
    }),
    {
      name: 'userStorage'
    }
  )
);

export default useUserStore;
