import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  token: string;
  setToken: (token: string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: '',
      setToken: (value) => set(() => ({ token: value })),
    }),
    {
      name: 'accessToken',
    }
  )
);
