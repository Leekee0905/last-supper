import { create } from 'zustand';

const useReview = create((set) => ({
  reviews: [],
  setReview: (post) => set((state) => ({ reviews: [...state.reviews, post] }))
}));

export default useReview;
