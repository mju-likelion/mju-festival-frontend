import { AxiosResponse } from 'axios';
import { Axios } from './Axios';
import { GetLostItemResponse, PostLostItemRequest } from '../types/lostItem';

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
