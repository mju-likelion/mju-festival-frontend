import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SimpleLostItem } from '../../types/lostItem';

interface LostItemsProps {
  lostItem: SimpleLostItem;
}

const LostItemCard = ({ lostItem }: LostItemsProps) => {
  const { id, title, content, imageUrl, isFounded } = lostItem;
  const navigate = useNavigate();

  const moveDetailPage = () => {
    navigate(`/lost-items/${id}`, { state: lostItem });
  };

  return (
    <Wrapper onClick={moveDetailPage}>
      {isFounded && <Overlay />}
      {isFounded && <Badge>찾음</Badge>}
      <TextLayout>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </TextLayout>
      <ItemImg src={imageUrl} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 12px 11px;
  justify-content: space-between;
  border-radius: 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.white100};
  cursor: pointer;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black30};
  z-index: 1;
`;

const Badge = styled.div`
  width: 68px;
  height: 24px;
  position: absolute;
  bottom: 12px;
  right: 11px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.typographies.caption1}
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
  border-radius: 99px;
  z-index: 2;
`;

const TextLayout = styled.div`
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
