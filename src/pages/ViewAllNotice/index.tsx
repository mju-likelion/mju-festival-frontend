import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import NoticeCard from './NoticeCard';
import { useAuthStore } from '../../store';
import useFetchNotices from '../../hooks/useFetchNotices';
import InfoText from '../../components/InfoText';
import TitleLayout from './TitleLayout.tsx';
import { ReactComponent as LeftArrowActive } from '../../assets/icons/left_arrow_active.svg';
import { ReactComponent as RightArrowActive } from '../../assets/icons/right_arrow_active.svg';
import { ReactComponent as BigDelete } from '../../assets/icons/big_delete.svg';
import Header from '../../components/Header.tsx';
import DropDown from './DropDown.tsx';
import { SortKey } from '../../types/index.ts';
import LoadingSpinner from '../../components/LoadingSpinner.tsx';

const ViewAllNotice = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const [isSorted, setIsSorted] = useState<SortKey>('desc');
  const [search, setSearch] = useSearchParams();

  const currentPage = Math.max(parseInt(search.get('page') ?? '1', 10), 1);

  const { notices, totalPage, isLoading } = useFetchNotices({
    isSorted,
    curPage: currentPage - 1,
  });

  return (
    <Wrapper>
      <Header path="/main" />
      <TitleLayout />
      <InfoTextLayout>
        <InfoText>공지사항</InfoText>
      </InfoTextLayout>
      <DropDownLayout>
        <DropDown
          setIsSorted={setIsSorted}
          setPage={() => setSearch({ page: '1' })}
        />
      </DropDownLayout>
      <NoticeLayout>
        {notices && notices.length > 0 ? (
          notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              title={notice.title}
              content={notice.content}
              onClick={() => navigate(`/view/detail-notice/${notice.id}`)}
            />
          ))
        ) : (
          <NoDataLayout>
            <BigDelete />
            <NoDataText>관련된 게시물이 없습니다.</NoDataText>
          </NoDataLayout>
        )}
      </NoticeLayout>
      <LoadingSpinner isLoading={isLoading} />
      <BtnLayout>
        <PageBtnContainer>
          <button
            type="button"
            disabled={currentPage === 1}
            aria-label="Previous page"
            onClick={() =>
              setSearch({
                page: String(currentPage - 1),
              })
            }
          >
            <LeftArrowActive />
          </button>
          <TempP>
            {(notices.length && `${currentPage}/${totalPage}`) || '0/0'}
          </TempP>
          <button
            type="button"
            disabled={currentPage === totalPage || !notices.length}
            aria-label="Previous page"
            onClick={() =>
              setSearch({
                page: String(currentPage + 1),
              })
            }
          >
            <RightArrowActive />
          </button>
        </PageBtnContainer>
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

const PageBtnContainer = styled.div`
  width: 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 14px;
  gap: 1px;
`;
const TempP = styled.p`
  ${({ theme }) => theme.typographies.footout};
  color: ${({ theme }) => theme.colors.text900};
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

const NoDataLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 20px;
`;

const NoDataText = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.black50};
`;

export default ViewAllNotice;
