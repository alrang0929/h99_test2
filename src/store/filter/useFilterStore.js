import { ALL_CATEGORY_ID } from '@/constants';
import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,

  setMinPrice: (price) => set((state) => ({ ...state, minPrice: price })),
  setMaxPrice: (price) => set((state) => ({ ...state, maxPrice: price })),
  setTitle: (title) => set((state) => ({ ...state, title })),
  setCategoryId: (categoryId) => set((state) => ({ ...state, categoryId })),

  resetFilter: () =>
    set(() => ({
      minPrice: 0,
      maxPrice: 0,
      title: '',
      categoryId: ALL_CATEGORY_ID,
    })),
}));
