import styled from 'styled-components';
import { ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoticeCard from './NoticeCard';
import { SortKey, SortOptions } from '../../types';
import { useAuthStore, usePageStore } from '../../store';
import useFetchNotices from '../../hooks/useFetchNotices';
import InfoText from '../../components/InfoText';
import TitleLayout from './Header.tsx';

const ViewAllNotice = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const { curPage, isSorted, setCurPage, setIsSorted } = usePageStore();
  const sortOptions: SortOptions = { desc: '최신순', asc: '나중순' };
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
      <TitleLayout />
      <InfoTextLayout>
        <InfoText>공지사항</InfoText>
      </InfoTextLayout>
      <SelectLayout>
        <select onChange={handleSort}>
          {Object.entries(sortOptions).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </select>
      </SelectLayout>
      <NoticeLayout>
        {notices.map((notice) => (
          <NoticeCard
            key={notice.id}
            title={notice.title}
            content={notice.content}
            onClick={() => navigate(`/view/detail-notice/${notice.id}`)}
          />
        ))}
      </NoticeLayout>

      <BtnLayout>
        <TempBtnDiv>
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
        </TempBtnDiv>
        {role === 'STUDENT_COUNCIL' && (
          <CreateBtn onClick={() => navigate('/create/notice')}>
            게시물 작성하기
          </CreateBtn>
        )}
      </BtnLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
`;

const InfoTextLayout = styled.div`
  padding: 48px 95px 20px 95px;
`;

const SelectLayout = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 20px 20px 0;

  select {
    height: 24px;
    border-radius: 999px;
    border: none;
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const NoticeLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 581px;
  padding: 19px 20px;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const BtnLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 14px 75px 52px 75px;
`;

const TempBtnDiv = styled.div`
  display: flex;
`;
const TempP = styled.p`
  margin: 0 10px;
`;

const CreateBtn = styled.button`
  width: 100%;
  max-width: 240px;
  height: 52px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.blue100};
  color: ${({ theme }) => theme.colors.white100};
  font-size: 17px;
  font-weight: 600;
`;
export default ViewAllNotice;
