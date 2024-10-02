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
  const [isFoundModalOpen, setIsFoundModalOpen] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, role } = useAuthStore();
  const { title, content, createdAt, imageUrl, isFounded } = location.state;

  const formattedDate = useMemo(
    () => formatDate(new Date(createdAt)),
    [createdAt]
  );

  const handleDelete = async () => {
    try {
      if (!id || !token) throw new Error('삭제를 위한 ID나 토큰이 없습니다.');
      await deleteLostItem(id, token);
      setIsModalOpen(false);
      navigate('/lost-items');
    } catch (error) {
      handleError(error as Error);
    }
  };

  const handleFoundStatus = async () => {
    try {
      if (!id || !token || recipientName.length === 0) return;
      await patchLostItemAsFound(id, token, recipientName);
      setIsFoundModalOpen(false);
      navigate('/lost-items');
    } catch (error) {
      handleError(error as Error);
    }
  };

  return (
    <Wrapper>
      <Header path="/lost-items" />
      <TitleLayout>
        <Title>분실물찾기</Title>
        <SubTitle>분실물 내용을 확인하고 찾아가세요!</SubTitle>
      </TitleLayout>
      <ContentLayout>
        <RegisterDate>등록일: {formattedDate}</RegisterDate>
        <ItemImg src={imageUrl} />
        <ItemTextContainer>
          <ItemTitle>제목 : {title}</ItemTitle>
          <ItemContent>내용 : {content}</ItemContent>
        </ItemTextContainer>
        <PlaceContainer>
          찾아가는 위치:
          <PlaceIcon />
          명진당
        </PlaceContainer>

        {role === 'STUDENT_COUNCIL' && (
          <>
            <ButtonLayout>
              {!isFounded && (
                <EditButton
                  onClick={() =>
                    navigate(`/lost-items/${id}/edit`, {
                      state: location.state,
                    })
                  }
                >
                  수정하기
                </EditButton>
              )}
              <DeleteButton
                onClick={() => setIsModalOpen(true)}
                $isFounded={isFounded}
              >
                삭제하기
              </DeleteButton>
            </ButtonLayout>
            {!isFounded && (
              <FoundedButton onClick={() => setIsFoundModalOpen(true)}>
                분실물 찾음
              </FoundedButton>
            )}
          </>
        )}
      </ContentLayout>

      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          title="삭제하기 전 유의사항"
          content={
            <>
              게시물 삭제 후 게시물
              <br />
              복구가 되지 않습니다. <br />
              <br />
              확인하신 후 삭제해주시길 바랍니다.
            </>
          }
          onConfirm={handleDelete}
        />
      )}

      {isFoundModalOpen && (
        <Modal
          setIsModalOpen={setIsFoundModalOpen}
          title="수령인 정보 입력"
          content={
            <RecipientInput
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="ex) 학번, 이름 등 (최대 150자)"
              maxLength={150}
            />
          }
          onConfirm={handleFoundStatus}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
  padding-bottom: 100px;
`;

const TitleLayout = styled.div`
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

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.white100};
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

const ItemTextContainer = styled.div`
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

const PlaceContainer = styled.div`
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

const DeleteButton = styled(Button)<{ $isFounded: boolean }>`
  color: ${({ theme, $isFounded }) =>
    $isFounded ? theme.colors.white100 : theme.colors.blue100};
  background-color: ${({ theme, $isFounded }) =>
    $isFounded ? theme.colors.blue100 : theme.colors.white100};
  border: 1px solid
    ${({ theme, $isFounded }) => !$isFounded && theme.colors.blue100};
`;

const FoundedButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
`;

const RecipientInput = styled.input`
  padding: 10px;
  ${({ theme }) => theme.typographies.body2};
  border: 1px solid ${({ theme }) => theme.colors.black10};
  border-radius: 12px;
  line-height: 20px;
  white-space: pre-wrap;
`;

export default DetailLostItem;
