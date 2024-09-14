import { AxiosResponse } from 'axios';
import {
  BoothDetailInfo,
  BoothEditFields,
  BoothList,
  BoothQrData,
  Ownership,
} from '../types';
import { Axios } from './Axios.ts';

export const getBoothList = async () => {
  const { data } = await Axios.get<BoothList>(`/booths?page=${0}&size=${30}`);
  return data.simpleBooths;
};

export const getBoothDetail = async (boothId: string) => {
  const { data } = await Axios.get<BoothDetailInfo>(`/booths/${boothId}`);
  return data;
};

export const getOwnership = async (token: string, boothId: string) => {
  const { data } = await Axios.get<Ownership>(`/booths/${boothId}/ownership`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.isOwner;
};

export const patchBoothDetail = async (
  boothId: string,
  updateData: Partial<BoothEditFields>,
  token: string
) => {
  const { data } = await Axios.patch(`/booths/${boothId}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getQrData = async (token: string, id: string) => {
  const { data }: AxiosResponse<BoothQrData> = await Axios.get(
    `/booths/${id}/qr`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.qrCode;
};
