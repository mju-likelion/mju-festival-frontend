import { DetailNoticeType, SimpleNotice } from '../types/notice.ts';
import { Axios } from './Axios.ts';

export const getNotices = async (
  isSorted: string,
  page: number,
  SIZE: number
): Promise<GetNoticesType> => {
  const response = await Axios.get(
    `/announcements?sort=${isSorted}&page=${page}&size=${SIZE}`
  );
  return response.data;
};

export const fetchNotice = async (
  id: string | undefined
): Promise<DetailNoticeType> => {
  const response = await Axios.get(`/announcements/${id}`);
  return response.data;
};

interface GetNoticesType {
  simpleAnnouncements: SimpleNotice[];
  totalPage: number;
}
