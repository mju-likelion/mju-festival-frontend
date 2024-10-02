import { AxiosResponse } from 'axios';
import {
  GetLostItemResponse,
  LostItemRequest,
  SimpleLostItem,
} from '../types/lostItem';
import { Axios } from './Axios';

export const getLostItems = async (
  sort: string,
  page: number,
  size: number
) => {
  const { data }: AxiosResponse<GetLostItemResponse> = await Axios.get(
    `/lost-items?sort=${sort}&page=${page}&size=${size}`
  );
  return data;
};

export const getDetailLostItem = async (id: string) => {
  const { data }: AxiosResponse<SimpleLostItem> = await Axios.get(
    `/lost-items/${id}`
  );
  return data;
};

export const getSearchLostItems = async (
  sort: string,
  keyword: string,
  page: number,
  size: number
) => {
  const { data } = await Axios.get(
    `/lost-items/search?sort=${sort}&keyword=${keyword}&page=${page}&size=${size}`
  );
  return data;
};

export const postLostItemImg = async (formData: FormData, token: string) => {
  const {
    data: { url },
  } = await Axios.post('/images?type=LOST_ITEM', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return url;
};

export const postLostItem = async (
  lostItemData: LostItemRequest,
  token: string
) => {
  await Axios.post('/lost-items', lostItemData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteLostItem = async (id: string, token: string) => {
  await Axios.delete(`lost-items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchLostItem = async (
  id: string,
  updateData: Partial<LostItemRequest>,
  token: string
) => {
  const { data } = await Axios.patch(`lost-items/${id}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const patchLostItemAsFound = async (
  id: string,
  token: string,
  retrieverInfo: string
) => {
  await Axios.patch(
    `lost-items/${id}/found`,
    { retrieverInfo },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
