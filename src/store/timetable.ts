import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TimeTableDate } from '../types';

type TimeTableState = {
  selectedDate: TimeTableDate;
  setCurDate: (selectedDate: TimeTableDate) => void;
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
