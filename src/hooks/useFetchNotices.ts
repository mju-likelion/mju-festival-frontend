import { useCallback, useEffect, useState } from 'react';
import { getNotices } from '../api/notice.ts';
import { NoticeType, UseFetchNoticesProps } from '../types/index.ts';

const useFetchNotices = ({ isSorted, curPage }: UseFetchNoticesProps) => {
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const SIZE = 4;

  const fetchNotices = useCallback(async () => {
    try {
      const response = await getNotices(isSorted, curPage, SIZE);
      setTotalPage(response.totalPage);
      setNotices(response.simpleAnnouncements);
    } catch (err) {
      setError('공지사항을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [isSorted, curPage]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return { notices, totalPage, isLoading, error };
};

export default useFetchNotices;
