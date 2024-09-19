import styled from 'styled-components';
import { ReactComponent as NoDataIcon } from '../../assets/icons/noData.svg';
import { SimpleLostItem } from '../../types/lostItem';
import LostItemCard from './LostItemCard';

interface ItemListProps {
  lostItems: SimpleLostItem[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ItemList = ({ lostItems, setIsModalOpen }: ItemListProps) => {
  return (
    <Wrapper>
      {lostItems.length > 0 ? (
        lostItems.map((lostItem) => (
          <LostItemCard
            key={lostItem.id}
            lostItem={lostItem}
            setIsModalOpen={setIsModalOpen}
          />
        ))
      ) : (
        <NoDataLayout>
          <NoDataIcon />
          <NoDataText>관련된 게시물이 없습니다.</NoDataText>
        </NoDataLayout>
      )}
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

export default ItemList;
