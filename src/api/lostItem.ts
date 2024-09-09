import { AxiosResponse } from 'axios';
import { GetLostItemResponse, PostLostItemRequest } from '../types/lostItem';
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
  lostItemData: PostLostItemRequest,
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
