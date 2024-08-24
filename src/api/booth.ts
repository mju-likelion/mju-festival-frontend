import axios, { AxiosResponse } from 'axios';
import { Axios } from './Axios.ts';
import { BoothDetailInfo, BoothList, BoothQrData } from '../types';

export const getBoothList = async () => {
  const response = await Axios.get<BoothList>(`/booths?page=${0}&size=${30}`);
  return response.data.simpleBooths;
};

export const getBoothDetail = async (boothId: string) => {
  const response = await Axios.get<BoothDetailInfo>(`/booths/${boothId}`);
  return response.data;
};

export const getQrData = async (id: string, token: string) => {
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
