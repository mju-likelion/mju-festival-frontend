import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deleteLostItem, patchLostItemAsFound } from '../../api/lostItem';
import { ReactComponent as PlaceIcon } from '../../assets/icons/place.svg';
import Header from '../../components/Header';
import { useAuthStore } from '../../store';
import { formatDate } from '../../utils/dateUtil';
import { handleError } from '../../utils/errorUtil';
import Modal from './Modal';

const DetailLostItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, role } = useAuthStore();
  const { title, content, createdAt, imageUrl } = location.state;

  const formattedDate = useMemo(
    () => formatDate(new Date(createdAt)),
    [createdAt]
  );

  const handleDelete = async () => {
    try {
      if (id && token) {
        await deleteLostItem(id, token);
        setIsModalOpen(false);
        navigate('/lost-items');
      } else {
        console.error('삭제를 위한 ID나 토큰이 없습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFoundStatus = async () => {
    try {
      if (id && token) {
        await patchLostItemAsFound(id, token, '이진혁');
        navigate('/lost-items');
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} handleDelete={handleDelete} />
      )}
      <Header />
      <TitleWrapper>
        <Title>분실물찾기</Title>
        <SubTitle>분실물 내용을 확인하고 찾아가세요!</SubTitle>
      </TitleWrapper>
      <Wrapper>
        <RegisterDate>{formattedDate}</RegisterDate>
        <ItemImg src={imageUrl} />
        <ItemTextLayout>
          <ItemTitle>제목 : {title}</ItemTitle>
          <ItemContent>내용 : {content}</ItemContent>
        </ItemTextLayout>
        <PlaceLayout>
          찾아가는 위치:
          <PlaceIcon />
          명진당
        </PlaceLayout>
        {role === 'STUDENT_COUNCIL' && (
          <>
            <ButtonLayout>
              <EditButton
                onClick={() =>
                  navigate(`/lost-items/${id}/edit`, { state: location.state })
                }
              >
                수정하기
              </EditButton>
              <DeleteButton onClick={() => setIsModalOpen(true)}>
                삭제하기
              </DeleteButton>
            </ButtonLayout>
            <FoundedButton onClick={handleFoundStatus}>
              분실물 찾음
            </FoundedButton>
          </>
        )}
      </Wrapper>
    </>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 20px;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const RegisterDate = styled.p`
  align-self: flex-end;
  ${({ theme }) => theme.typographies.caption1};
  color: ${({ theme }) => theme.colors.gray400};
`;

const ItemImg = styled.img`
  border-radius: 12px;
  height: 248px;
  object-fit: cover;
  margin: 9px 0 17px 0;
`;

const ItemTextLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ItemTitle = styled.p`
  height: 52px;
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.text900};
`;

const ItemContent = styled.p`
  height: 158px;
  ${({ theme }) => theme.typographies.body2};
  color: ${({ theme }) => theme.colors.text900};
`;

const PlaceLayout = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0 63px 0;
  ${({ theme }) => theme.typographies.body2};
  color: ${({ theme }) => theme.colors.text900};
`;

const ButtonLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
`;

// 상속으로 재사용
const Button = styled.button`
  width: 100%;
  border-radius: 12px;
  padding: 16px 11px;
  ${({ theme }) => theme.typographies.body1};
`;

const EditButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
`;

const DeleteButton = styled(Button)`
  color: ${({ theme }) => theme.colors.blue100};
  border: 1px solid ${({ theme }) => theme.colors.blue100};
`;

const FoundedButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
`;

export default DetailLostItem;
