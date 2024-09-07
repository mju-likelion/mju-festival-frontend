import styled from 'styled-components';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import NoticeCard from './NoticeCard';
import { SortKey, SortOptions } from '../../types';
import { useAuthStore, usePageStore } from '../../store';
import useFetchNotices from '../../hooks/useFetchNotices';

const ViewAllNotice = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const { curPage, isSorted, setCurPage, setIsSorted } = usePageStore();
  const sortOptions: SortOptions = { desc: '최신순', asc: '오래된순' };
  const { notices, totalPage, isLoading } = useFetchNotices({
    isSorted,
    curPage,
  });

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsSorted(e.target.value as SortKey);
  };

  const handlePage = (index: number) => {
    setCurPage(index === 1 ? curPage + 1 : curPage - 1);
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
          disabled={curPage === 0 || isLoading}
          onClick={() => handlePage(-1)}
        >
          {'<'}
        </button>
        <TempP>{`${curPage + 1}/${totalPage}`}</TempP>
        <button
          type="button"
          disabled={curPage + 1 === totalPage || isLoading}
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
