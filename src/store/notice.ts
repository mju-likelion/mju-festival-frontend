import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SortKey } from '../types';

type PageState = {
  curPage: number;
  isSorted: SortKey;
  setCurPage: (curPage: number) => void;
  setIsSorted: (isSorted: SortKey) => void;
};

export const usePageStore = create<PageState>()(
  persist(
    (set) => ({
      curPage: 0,
      isSorted: 'desc',
      setCurPage: (curPage) => set({ curPage }),
      setIsSorted: (isSorted) => set({ isSorted }),
    }),
    { name: 'pageInfo' }
  )
);
