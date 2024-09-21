import { create } from 'zustand';

export const useHamburgerStore = create((set) => ({
  isHamburgerMenuOpen: false,
  isHamburgerMenuModalOpen: false,
  setIsHamburgerMenuOpen: (isOpen) => set(() => ({ isHamburgerMenuOpen: isOpen })),
  setIsHamburgerMenuModalOpen: (isOpen) => set(() => ({ isHamburgerMenuModalOpen: isOpen }))
}));
