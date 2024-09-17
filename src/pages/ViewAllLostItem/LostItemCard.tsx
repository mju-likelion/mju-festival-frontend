import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SimpleLostItem } from '../../types/lostItem';

const LostItemCard = ({ lostItem }: { lostItem: SimpleLostItem }) => {
  const { id, title, content, imageUrl } = lostItem;
  const navigate = useNavigate();

  const moveDetailPage = () => {
    navigate(`/lost-items/${id}`, { state: lostItem });
  };

  return (
    <Wrapper onClick={moveDetailPage}>
      <TextLayout>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </TextLayout>
      <ItemImg src={imageUrl} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 12px 11px;
  justify-content: space-between;
  border-radius: 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const TextLayout = styled.div`
  // 이미지 크기 고정 100px + gap 10px
  width: calc(100% - 110px);
  padding: 2px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.p`
  padding-bottom: 10px;
  border-bottom: 1px solid #e1ebf0;
  ${({ theme }) => theme.typographies.title1}
  color: ${({ theme }) => theme.colors.blue100};

  // 텍스트 길어지면 .처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.p`
  height: 54px;
  ${({ theme }) => theme.typographies.body2}
  color: ${({ theme }) => theme.colors.text900};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
`;
export default LostItemCard;
