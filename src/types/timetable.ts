export type PerformanceType = '댄스' | '밴드' | '힙합' | '축하공연';

export type TimeTableDate = '10월 07일' | '10월 08일';
export interface TimeTableDetailInfo {
  type: PerformanceType;
  image: string;
  teamName: string;
  time: string;
}

export type TimeTableInfo = Record<TimeTableDate, TimeTableDetailInfo[]>;
