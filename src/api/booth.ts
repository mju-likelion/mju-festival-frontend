import { AxiosResponse } from 'axios';
import {
  BoothDepartment,
  BoothDetailInfo,
  BoothEditFields,
  BoothPreview,
  BoothQrData,
  Ownership,
} from '../types';
import { Axios } from './Axios.ts';

export const getBoothDepartments = async () => {
  const { data } = await Axios.get<BoothDepartment[]>(`/booths/affiliations`);
  return data;
};

export const getBooths = async (boothId: string) => {
  const { data } = await Axios.get<BoothPreview[]>(
    `/booths?affiliation_id=${boothId}`
  );
  return data;
};

export const getBoothDetail = async (boothId: string) => {
  const { data } = await Axios.get<BoothDetailInfo>(`/booths/${boothId}`);
  return data;
};

export const getOwnership = async (token: string, boothId: string) => {
  const { data } = await Axios.get<Ownership>(
    `/booths/${boothId}/managing-info`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export const postBoothVisit = async (
  qrId: string,
  token: string,
  strategy: string
) => {
  alert(qrId);
  alert(strategy);
  await Axios.post(
    `/booths/${qrId}/visit?strategy=${strategy}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
