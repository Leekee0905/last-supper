import { create } from 'zustand';

const useReview = create((set) => ({
  reviews: [],
  setReview: (post) => set((state) => ({ reviews: [...state.reviews, post] })),
  updateReview: (updatePost) => set((state) => ({ reviews: [...state.reviews, updatePost] })),
  deleteReview: (deletePost) => set(() => ({ reviews: deletePost }))
}));

export default useReview;
