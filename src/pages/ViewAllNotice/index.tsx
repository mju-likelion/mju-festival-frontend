import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import NoticeCard from './NoticeCard';
import { Axios } from '../../api/Axios';
import { NoticeType } from '../../types/notice';

const ViewAllNotice = () => {
  //  Todo: isLoading finally에 추가하기
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [isSorted, setIsSorted] = useState('desc');
  const [page, setPage] = useState(1);
  const size = 4;
  // 첫 게시물의 인덱스
  const offset = (page - 1) * size;

  const getNotices = useCallback(async () => {
    try {
      const response = await Axios.get(
        `/announcements?sort=${isSorted}&page=${page}&size=${size}`
      );
      setNotices(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [isSorted, page, size]);

  useEffect(() => {
    getNotices();
  }, [getNotices]);
  return (
    <Wrapper>
      <Header />
      {notices.map((notice) => (
        <NoticeCard
          key={notice.id}
          title={notice.title}
          content={notice.content}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ViewAllNotice;
