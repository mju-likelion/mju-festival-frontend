import React from 'react';
import { AxiosResponse } from 'axios';
import { Axios } from './Axios';
import {
  SimpleLostItem,
  GetLostItemResponse,
  PostLostItemRequest,
} from '../types/lostItem';

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

export const getSearchLostItem = async (
  sort: string,
  keyword: string,
  page: number,
  size: number,
  setLostItems: React.Dispatch<React.SetStateAction<SimpleLostItem[]>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const { data } = await Axios.get(
      `/lost-items/search?sort=${sort}&keyword=${keyword}&page=${page}&size=${size}`
    );
    const { simpleLostItems, totalPage } = data;

    setLostItems(simpleLostItems);
    setTotalPage(totalPage);
  } catch (error) {
    console.log(error);
  }
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
