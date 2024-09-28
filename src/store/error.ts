import { create } from 'zustand';

type ErrorState = {
  errorMessage: string | null;
  setErrorMessage: (message: string) => void;
};

export const useErrorStore = create<ErrorState>()((set) => ({
  errorMessage: null,
  setErrorMessage: (message: string) => set({ errorMessage: message }),
}));
