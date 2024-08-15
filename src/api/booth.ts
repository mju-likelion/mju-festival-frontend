import { Axios } from './Axios.ts';
import { BoothList } from '../types';

export const getBoothList = async () => {
  const response = await Axios.get<BoothList>(`/booths?page=${0}&size=${10}`);
  return response.data.simpleBooths;
};
