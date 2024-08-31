import { DetailNoticeType, GetNoticesType } from '../types/notice.ts';
import { Axios } from './Axios.ts';

export const getNotices = async (
  isSorted: string,
  page: number,
  SIZE: number
): Promise<GetNoticesType> => {
  const { data } = await Axios.get(
    `/announcements?sort=${isSorted}&page=${page}&size=${SIZE}`
  );

  return data;
};

export const fetchNotice = async (
  id: string | undefined
): Promise<DetailNoticeType> => {
  const { data } = await Axios.get(`/announcements/${id}`);
  return data;
};
