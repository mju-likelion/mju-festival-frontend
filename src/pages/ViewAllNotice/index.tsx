import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NoticeCard from './NoticeCard';
import { useAuthStore, usePageStore } from '../../store';
import useFetchNotices from '../../hooks/useFetchNotices';
import InfoText from '../../components/InfoText';
import TitleLayout from './TitleLayout.tsx';
import HeaderToMain from '../../components/HeaderToMain.tsx';
import { ReactComponent as LeftArrowActive } from '../../assets/icons/left_arrow_active.svg';
import { ReactComponent as RightArrowActive } from '../../assets/icons/right_arrow_active.svg';
import DropDown from './DropDown.tsx';

const ViewAllNotice = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const { isSorted, setIsSorted, setCurPage } = usePageStore();
  const [search, setSearch] = useSearchParams();

  const currentPage = Math.max(parseInt(search.get('page') ?? '1', 10), 1);

  const { notices, totalPage, isLoading } = useFetchNotices({
    isSorted,
    curPage: currentPage - 1,
  });

  return (
    <Wrapper>
      <HeaderToMain />
      <TitleLayout />
      <InfoTextLayout>
        <InfoText>공지사항</InfoText>
      </InfoTextLayout>
      <DropDownLayout>
        <DropDown setIsSorted={setIsSorted} setPage={setCurPage} />
      </DropDownLayout>
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
export default ViewAllNotice;
