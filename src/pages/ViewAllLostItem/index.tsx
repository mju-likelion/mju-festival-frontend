import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getLostItems, getSearchLostItems } from '../../api/lostItem';
import Header from '../../components/Header';
import InfoText from '../../components/InfoText';
import { useAuthStore } from '../../store';
import { SimpleLostItem, SortKey } from '../../types/lostItem';
import ItemList from './ItemList';
import Modal from './Modal';
import Page from './Page';
import SearchInput from './SearchInput';
import SortDropDown from './SortDropDown';

const LostItem = () => {
  const [lostItems, setLostItems] = useState<SimpleLostItem[]>([]);
  const [sorted, setSorted] = useState<SortKey>('desc');
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const SIZE: number = 4;

  const { role } = useAuthStore();
  const navigate = useNavigate();

  const fetchLostItems = async () => {
    const data = await getLostItems(sorted, page, SIZE);

    const { simpleLostItems, totalPage } = data;

    setLostItems(simpleLostItems);
    setTotalPage(totalPage);
  };

  const searchLostItems = async () => {
    const data = await getSearchLostItems(sorted, keyword, page, SIZE);
    const { simpleLostItems, totalPage } = data;

    setLostItems(simpleLostItems);
    setTotalPage(totalPage);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim() !== '') {
      setPage(0);
      searchLostItems();
    } else {
      fetchLostItems();
    }
  };

  useEffect(() => {
    if (keyword.trim() !== '') {
      setPage(0);
      searchLostItems();
    } else {
      fetchLostItems();
    }
  }, [sorted, page]);

  return (
    <Wrapper>
      <Header path="/main" />
      <TitleWrapper>
        <Title>분실물찾기</Title>
        <SubTitle>
          앗! 물건을 잃어버리셨나요?
          <br />
          잃어버린 물건을 찾아보세요!
        </SubTitle>
      </TitleWrapper>
      <ContentWrapper>
        <InfoText>분실물찾기</InfoText>
        <form onSubmit={onSubmit}>
          <SearchInput setKeyword={setKeyword} />
        </form>
        <SortDropDown setSorted={setSorted} setPage={setPage} />
      </ContentWrapper>
      <ItemList lostItems={lostItems} />
      <Page page={page} totalPage={totalPage} setPage={setPage} />

      {role === 'STUDENT_COUNCIL' && (
        <ButtonWrapper>
          <RegisterButton
            type="button"
            onClick={() => {
              navigate('/lost-items/register');
            }}
          >
            게시물 작성하기
          </RegisterButton>
        </ButtonWrapper>
      )}
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
  padding-bottom: 100px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 23px 20px 28px 20px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.text900};
`;

const SubTitle = styled.p`
  ${({ theme }) => theme.typographies.callout};
  color: ${({ theme }) => theme.colors.text900};
  margin-top: 9px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 41px;
`;

const RegisterButton = styled.button`
  width: 240px;
  padding: 16px 11px;
  border-radius: 12px;

  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
`;
export default LostItem;
