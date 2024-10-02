import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { getNotices } from '../../api/notice.ts';
import { ReactComponent as BigDelete } from '../../assets/icons/big_delete.svg';
import { ReactComponent as LeftArrowActive } from '../../assets/icons/left_arrow_active.svg';
import { ReactComponent as RightArrowActive } from '../../assets/icons/right_arrow_active.svg';
import { useAuthStore } from '../../store';
import { SortKey } from '../../types/notice.ts';
import NoticeCard from './NoticeCard';

interface NoticeContentProps {
  currentPage: number;
  isSorted: SortKey;
}

const NoticeContent = ({ currentPage, isSorted }: NoticeContentProps) => {
  const [, setSearch] = useSearchParams();
  const { token, role } = useAuthStore();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['notices', currentPage, isSorted],
    queryFn: () => getNotices(isSorted, currentPage - 1, 4),
  });

  const handleClick = () => {
    if (token && role === 'STUDENT_COUNCIL') {
      navigate('/create/notice');
    }
  };

  if (!data) {
    return (
      <NoticeLayout>
        <NoDataLayout>
          <BigDelete />
          <NoDataText>데이터가 없습니다.</NoDataText>
        </NoDataLayout>
      </NoticeLayout>
    );
  }

  const notices = data.simpleAnnouncements || [];
  const { totalPage } = data;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;
  const isEmptyNoticeList = !notices.length;

  return (
    <>
      <NoticeLayout>
        {notices.length > 0 ? (
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

      <BtnLayout>
        <PageBtnContainer>
          <button
            type="button"
            disabled={isFirstPage}
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
            disabled={isLastPage || isEmptyNoticeList}
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
          <CreateBtn onClick={handleClick}>게시물 작성하기</CreateBtn>
        )}
      </BtnLayout>
    </>
  );
};

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

export default NoticeContent;
