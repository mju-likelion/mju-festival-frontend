import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  deleteLostItem,
  getDetailLostItem,
  patchLostItemAsFound,
} from '../../api/lostItem';
import { ReactComponent as PlaceIcon } from '../../assets/icons/place.svg';
import Header from '../../components/Header';
import { useAuthStore } from '../../store';
import { SimpleLostItem } from '../../types/lostItem.ts';
import Modal from './Modal';

const DetailLostItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFoundModalOpen, setIsFoundModalOpen] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, role } = useAuthStore();

  const [itemData, setItemData] = useState<SimpleLostItem>({
    id: '',
    title: '',
    content: '',
    imageUrl: '',
    createdAt: '',
    isFounded: false,
  });

  const handleDelete = async () => {
    if (id && token) {
      await deleteLostItem(id, token);
      setIsModalOpen(false);
      navigate('/lost-items');
    }
  };

  const handleFoundStatus = async () => {
    if (!id || !token || recipientName.length === 0) return;
    await patchLostItemAsFound(id, token, recipientName);
    setIsFoundModalOpen(false);
    navigate('/lost-items');
  };

  const fetchData = async () => {
    if (id) {
      const response = await getDetailLostItem(id);
      setItemData(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Wrapper>
      <Header path="/lost-items" />
      <TitleLayout>
        <Title>분실물찾기</Title>
        <SubTitle>분실물 내용을 확인하고 찾아가세요!</SubTitle>
      </TitleLayout>
      <ContentLayout>
        <RegisterDate>등록일: {itemData.createdAt}</RegisterDate>
        <ItemImg src={itemData.imageUrl} />
        <ItemTextContainer>
          <ItemTitle>제목 : {itemData.title}</ItemTitle>
          <ItemContent>내용 : {itemData.content}</ItemContent>
        </ItemTextContainer>
        <PlaceContainer>
          찾아가는 위치:
          <PlaceIcon />
          총학생회 부스
        </PlaceContainer>

        {role === 'STUDENT_COUNCIL' && (
          <>
            <ButtonLayout>
              {!itemData.isFounded && (
                <EditButton
                  onClick={() =>
                    navigate(`/lost-items/${id}/edit`, {
                      state: itemData,
                    })
                  }
                >
                  수정하기
                </EditButton>
              )}
              <DeleteButton
                onClick={() => setIsModalOpen(true)}
                $isFounded={itemData.isFounded}
              >
                삭제하기
              </DeleteButton>
            </ButtonLayout>
            {!itemData.isFounded && (
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
  object-fit: contain;
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
  line-height: 22px;
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
  width: 100%;
  padding: 10px;
  ${({ theme }) => theme.typographies.footnote};
  border: 1px solid ${({ theme }) => theme.colors.black10};

  border-radius: 12px;
  line-height: 20px;
  white-space: pre-wrap;
`;

export default DetailLostItem;
