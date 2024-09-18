import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TimeTableState = {
  selectedDate: string;
  setCurDate: (selectedDate: string) => void;
};

export const useTimeTableDateStore = create<TimeTableState>()(
  persist(
    (set) => ({
      selectedDate: '10월 07일',
      setCurDate: (selectedDate) => set({ selectedDate }),
    }),
    { name: 'timetableDate' }
  )
);
