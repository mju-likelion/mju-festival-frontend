import React, { createContext, useContext, useMemo } from 'react';
import { PerformanceType, TimeTableInfo } from '../types';

interface TimeTableProviderProps {
  children: React.ReactNode;
}

type TimeTableContextType = {
  performanceTypeData: Record<PerformanceType, string>;
  timetableInfo: TimeTableInfo;
};

const TimeTableContext = createContext<TimeTableContextType | undefined>(
  undefined
);

const performanceTypeData: Record<PerformanceType, string> = {
  댄스: '#179A8C',
  밴드: '#5766C6',
  힙합: '#4B82EF',
  축하공연: '#FFB20A',
};

const timetableInfo: TimeTableInfo = {
  '10월 07일': [
    {
      type: '댄스',
      image: '../../assets/imgs/timetable_infoimg.png',
      teamName: '댄스 공연 input',
      time: '18 : 00',
    },
    {
      type: '밴드',
      image: '/path/to/band.jpg',
      teamName: '밴드 공연 input',
      time: '19 : 00',
    },
    {
      type: '힙합',
      image: '/path/to/hiphop.jpg',
      teamName: '힙합 공연 input',
      time: '18 : 00',
    },
    {
      type: '축하공연',
      image: '/path/to/celebration.jpg',
      teamName: '축하공연 input',
      time: '19 : 00',
    },
  ],
  '10월 08일': [
    {
      type: '댄스',
      image: '/path/to/dance.jpg',
      teamName: '댄스 공연 input',
      time: '19 : 00',
    },
    {
      type: '밴드',
      image: '/path/to/band.jpg',
      teamName: '밴드 공연 input',
      time: '19 : 00',
    },
    {
      type: '힙합',
      image: '/path/to/hiphop.jpg',
      teamName: '힙합 공연 input',
      time: '19 : 00',
    },
    {
      type: '축하공연',
      image: '/path/to/celebration.jpg',
      teamName: '축하공연 input',
      time: '19 : 00',
    },
  ],
};

export const TimeTableProvider = ({ children }: TimeTableProviderProps) => {
  const value = useMemo(() => ({ performanceTypeData, timetableInfo }), []);

  return (
    <TimeTableContext.Provider value={value}>
      {children}
    </TimeTableContext.Provider>
  );
};

export const useTimeTableData = () => {
  const context = useContext(TimeTableContext);
  if (context === undefined) {
    throw new Error('타임테이블 정보가 존재하지 않습니다');
  }

  return context;
};
