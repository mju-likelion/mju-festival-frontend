import { create } from 'zustand';
import { PerformanceType } from '../types';

type TimetableState = {
  performanceTypeData: Record<PerformanceType, string>;
};

export const usePerformTypeStore = create<TimetableState>()((set) => ({
  performanceTypeData: {
    댄스: '#179A8C',
    밴드: '#5766C6',
    힙합: '#4B82EF',
    축하공연: '#FFB20A',
  },
}));
