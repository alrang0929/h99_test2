import { auth } from '@/firebase';
import Cookies from 'js-cookie';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLogin: !!Cookies.get('accessToken'),
  user: null,
  registerStatus: 'idle',
  registerError: null,

  checkLoginStatus: async () => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            set({
              user: {
                uid: currentUser.uid,
                email: currentUser.email ?? '',
                displayName: currentUser.displayName ?? '',
              },
              isLogin: true,
            });
          } else {
            set({
              user: null,
              isLogin: false,
            });
            console.error('유저 정보를 가져올 수 없습니다.');
          }
        });
      } catch (error) {
        console.error('유저 정보를 가져오는 중 에러가 발생했습니다.', error);
        set({ user: null, isLogin: false });
      }
    }
  },

  logout: () => {
    Cookies.remove('accessToken');
    set({
      isLogin: false,
      user: null,
    });
  },

  setIsLogin: (isLogin) => {
    set({ isLogin });
  },

  setUser: (user) => {
    set({ user, isLogin: true });
  },
}));
