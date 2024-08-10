import styled from 'styled-components';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Header from './Header';
import NoticeCard from './NoticeCard';
import { Axios } from '../../api/Axios';
import { NoticeType, SortOptions } from '../../types/notice';

const ViewAllNotice = () => {
  //  Todo: isLoading finally에 추가하기
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [isSorted, setIsSorted] = useState('desc');
  const sortOptions: SortOptions = { desc: '최신순', asc: '오래된순' };
  const [page, setPage] = useState(0);
  const size = 4;

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

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsSorted(e.target.value);
  };

  return (
    <Wrapper>
      <Header />
      <select onChange={handleSort}>
        {Object.entries(sortOptions).map(([key, value]) => (
          <option value={key} key={key}>
            {value}
          </option>
        ))}
      </select>
      {notices.map((notice) => (
        <NoticeCard
          key={notice.id}
          title={notice.title}
          content={notice.content}
        />
      ))}
      <Layout />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Layout = styled.div`
  display: flex;
`;
const TempP = styled.p`
  margin: 0 10px;
`;
export default ViewAllNotice;
