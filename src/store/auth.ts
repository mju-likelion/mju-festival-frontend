import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role } from '../types';

type AuthState = {
  token: string;
  role: Role;
  setToken: (token: string) => void;
  setRole: (role: Role) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: '',
      role: '',
      setToken: (token) => set({ token }),
      setRole: (role) => set({ role }),
    }),
    {
      name: 'auth',
    }
  )
);
