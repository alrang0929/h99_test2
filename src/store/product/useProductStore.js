import { create } from 'zustand';

export const useProductStore = create(() => ({
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,
}));
