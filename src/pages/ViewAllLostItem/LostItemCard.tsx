import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SimpleLostItem } from '../../types/lostItem';

const LostItemCard = ({ lostItem }: { lostItem: SimpleLostItem }) => {
  const { title, content, imageUrl } = lostItem;
  const navigate = useNavigate();

  const moveDetailPage = () => {
    navigate('/lostItem/detail', { state: lostItem });
  };
  return (
    <Wrapper onClick={moveDetailPage}>
      <LeftLayout>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </LeftLayout>
      <ItemImg src={imageUrl} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  border: 1px solid blue;
  cursor: pointer;
`;

const LeftLayout = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.p``;
const Content = styled.p``;
const ItemImg = styled.img`
  height: 100%;
`;
export default LostItemCard;
