export type PerformanceType = '댄스' | '밴드' | '힙합' | '축하공연';

export interface TimeTableInfo {
  type: PerformanceType;
  image: string;
  teamName: string;
}
