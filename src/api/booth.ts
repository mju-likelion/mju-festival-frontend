import { Axios } from './Axios.ts';
import { BoothDetailInfo, BoothList } from '../types';

export const getBoothList = async () => {
  const response = await Axios.get<BoothList>(`/booths?page=${0}&size=${10}`);
  return response.data.simpleBooths;
};

export const getBoothDetail = async (boothId: string) => {
  const response = await Axios.get<BoothDetailInfo>(`/booths/${boothId}`);
  return response.data;
};
