import { Axios } from './Axios.ts';

export const getNotices = async (
  isSorted: string,
  page: number,
  SIZE: number
) => {
  const response = await Axios.get(
    `/announcements?sort=${isSorted}&page=${page}&size=${SIZE}`
  );
  return response.data;
};
