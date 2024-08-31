import { useCallback, useEffect, useState } from 'react';
import { getNotices } from '../api/notice.ts';
import { NoticeType, UseFetchNoticesProps } from '../types/index.ts';

const useFetchNotices = ({ isSorted, page }: UseFetchNoticesProps) => {
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const SIZE = 4;

  const fetchNotices = useCallback(async () => {
    try {
      const response = await getNotices(isSorted, page, SIZE);
      setTotalPage(response.totalPage);
      setNotices(response.simpleAnnouncements);
    } catch (err) {
      alert('올바른 동작을 해주세요');
      setIsLoading(true);
    } finally {
      setIsLoading(false);
    }
  }, [isSorted, page]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return { notices, totalPage, isLoading };
};

export default useFetchNotices;
