import React from 'react';
import { AxiosResponse } from 'axios';
import { Axios } from './Axios';
import { SimpleLostItem, ResponseLostItem } from '../types/lostItem';

export const getLostItem = async (
  sort: string,
  page: number,
  size: number,
  setLostItems: React.Dispatch<React.SetStateAction<SimpleLostItem[]>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const { data }: AxiosResponse<ResponseLostItem> = await Axios.get(
      `/lost-items?sort=${sort}&page=${page}&size=${size}`
    );
    const { simpleLostItems, totalPage } = data;

    setLostItems(simpleLostItems);
    setTotalPage(totalPage);
  } catch (error) {
    console.log(error);
  }
};

// 재사용성 리팩토링 필요
