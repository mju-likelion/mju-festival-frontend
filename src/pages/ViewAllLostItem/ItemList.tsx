import styled from 'styled-components';
import { SimpleLostItem } from '../../types/lostItem';
import LostItemCard from './LostItemCard';

interface ItemListProps {
  lostItems: SimpleLostItem[];
}

const ItemList = ({ lostItems }: ItemListProps) => {
  return (
    <Wrapper>
      {lostItems.map((lostItem) => (
        <LostItemCard key={lostItem.id} lostItem={lostItem} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 580px;
  padding: 19px 20px 21px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #f0f5f7;
`;
export default ItemList;
