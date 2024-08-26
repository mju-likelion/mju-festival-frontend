import axios, { AxiosResponse } from 'axios';
import { Axios } from './Axios.ts';
import {
  BoothDetailInfo,
  BoothEditFields,
  BoothList,
  BoothQrData,
  Ownership,
} from '../types';

export const getBoothList = async () => {
  const response = await Axios.get<BoothList>(`/booths?page=${0}&size=${30}`);
  return response.data.simpleBooths;
};

export const getBoothDetail = async (boothId: string) => {
  const response = await Axios.get<BoothDetailInfo>(`/booths/${boothId}`);
  return response.data;
};

export const getOwnership = async (token: string, boothId: string) => {
  const response = await Axios.get<Ownership>(`/booths/${boothId}/ownership`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.isOwner;
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

export const getQrData = async (token: string, id: string) => {
  try {
    const { data }: AxiosResponse<BoothQrData> = await Axios.get(
      `/booths/${id}/qr`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.qrCode;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { message } = error.response.data;
      console.log(message);
    }
  }
};
