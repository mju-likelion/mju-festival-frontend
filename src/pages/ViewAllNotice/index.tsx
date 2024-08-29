import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import NoticeCard from './NoticeCard';
import { SortKey, SortOptions } from '../../types';
import { useAuthStore } from '../../store';
import useFetchNotices from '../../hooks/useFetchTotalNotice';

const ViewAllNotice = () => {
  const [isSorted, setIsSorted] = useState<SortKey>('desc');
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const sortOptions: SortOptions = { desc: '최신순', asc: '오래된순' };

  const { notices, totalPage, isLoading } = useFetchNotices({ isSorted, page });

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsSorted(e.target.value as SortKey);
  };

  const handlePage = (index: number) => {
    setPage(index === 1 ? page + 1 : page - 1);
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
          onClick={() => navigate(`/view/detail-notice/${notice.id}`)}
        />
      ))}

      <Layout>
        <button
          type="button"
          disabled={page === 0 || isLoading}
          onClick={() => handlePage(-1)}
        >
          {'<'}
        </button>
        <TempP>{`${page + 1}/${totalPage}`}</TempP>
        <button
          type="button"
          disabled={page + 1 === totalPage || isLoading}
          onClick={() => handlePage(1)}
        >
          {'>'}
        </button>
        {role === 'STUDENT_COUNCIL' && (
          <CreateBtn onClick={() => navigate('/create/notice')}>
            공지사항 작성하기
          </CreateBtn>
        )}
      </Layout>
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

const CreateBtn = styled.button`
  background-color: #002968;
  color: white;
`;
export default ViewAllNotice;
