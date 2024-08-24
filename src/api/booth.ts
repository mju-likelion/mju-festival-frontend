import { Axios } from './Axios.ts';
import { BoothDetailInfo, BoothEditFields, BoothList } from '../types';

export const getBoothList = async () => {
  const response = await Axios.get<BoothList>(`/booths?page=${0}&size=${10}`);
  return response.data.simpleBooths;
};

export const getBoothDetail = async (boothId: string) => {
  const response = await Axios.get<BoothDetailInfo>(`/booths/${boothId}`);
  return response.data;
};

export const patchBoothDetail = async (
  boothId: string,
  updateData: Partial<BoothEditFields>,
  token: string
) => {
  const response = await Axios.patch(`/booths/${boothId}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
