import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import InfoText from '../../components/InfoText';
import TitleLayout from './TitleLayout.tsx';
import Header from '../../components/Header.tsx';
import { SortKey } from '../../types/index.ts';
import DropDown from './DropDown.tsx';
import NoticeContent from './NoticeContent.tsx';

const ViewAllNotice = () => {
  const [isSorted, setIsSorted] = useState<SortKey>('desc');
  const [search, setSearch] = useSearchParams();
  const currentPage = Math.max(parseInt(search.get('page') ?? '1', 10), 1);

  return (
    <Wrapper>
      <Header path="/main" />
      <TitleLayout />
      <InfoTextLayout>
        <InfoText>공지사항</InfoText>
      </InfoTextLayout>
      <DropDownLayout>
        <DropDown
          isSorted={isSorted}
          setIsSorted={setIsSorted}
          setPage={() => setSearch({ page: '1' })}
        />
      </DropDownLayout>
      <NoticeContent isSorted={isSorted} currentPage={currentPage} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
`;

const DropDownLayout = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-bottom: 10px;
  padding-right: 20px;
`;
const InfoTextLayout = styled.div`
  padding: 48px 95px 20px 95px;
`;

export default ViewAllNotice;
