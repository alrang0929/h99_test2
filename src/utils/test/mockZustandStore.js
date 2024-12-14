import { useAuthStore } from '@/store/auth/useAuthStore';
import { useCartStore } from '@/store/cart/useCartStore';
import { useFilterStore } from '@/store/filter/useFilterStore';
import { useToastStore } from '@/store/toast/useToastStore';

const mockStore = (hook, state) => {
  const initialState = hook.getState();
  hook.setState({ ...initialState, ...state }, true);
};

export const mockUseAuthStore = (state) => {
  mockStore(useAuthStore, state);
};

export const mockUseCartStore = (state) => {
  mockStore(useCartStore, state);
};

export const mockUseFilterStore = (state) => {
  mockStore(useFilterStore, state);
};

export const mockUseToastStore = (state) => {
  mockStore(useToastStore, state);
};
