import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getLostItems, getSearchLostItems } from '../../api/lostItem';
import FloatingButton from '../../components/FloatingButton';
import { useAuthStore } from '../../store';
import { SimpleLostItem, SortKey, SortOptions } from '../../types/lostItem';
import Header from './Header';
import LostItemCard from './LostItemCard';

const LostItem = () => {
  const [lostItems, setLostItems] = useState<SimpleLostItem[]>([]);
  const [sorted, setSorted] = useState<SortKey>('desc');
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const sortOptions: SortOptions = { desc: '최신순', asc: '오래된순' };
  const SIZE: number = 4;

  const { role } = useAuthStore();
  const navigate = useNavigate();

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSorted(e.target.value as SortKey);
    setPage(0);
  };

  const handlePageNum = (num: number) => {
    setPage((prev) => {
      const nextPage = prev + num;

      if (nextPage < 0 || nextPage + 1 > totalPage) {
        return prev;
      }

      return nextPage;
    });
  };

  const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const fetchLostItems = async () => {
    try {
      const data = await getLostItems(sorted, page, SIZE);
      const { simpleLostItems, totalPage } = data;

      setLostItems(simpleLostItems);
      setTotalPage(totalPage);
    } catch (error) {
      console.error(error);
    }
  };

  const searchLostItems = async () => {
    try {
      const data = await getSearchLostItems(sorted, keyword, page, SIZE);
      const { simpleLostItems, totalPage } = data;

      setLostItems(simpleLostItems);
      setTotalPage(totalPage);
    } catch (error) {
      console.error(error);
    }
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
    fetchLostItems();
  }, []);

  useEffect(() => {
    searchLostItems();
  }, [sorted, page]);

  return (
    <Wrapper>
      <Header />
      <form onSubmit={onSubmit}>
        <SearchInput onChange={handleKeyword} />
        <button type="submit">검색하기</button>
      </form>
      <ListLayout>
        <ListTItleContainer>
          <ListTitle />
          <SortedSelect onChange={handleSort}>
            {Object.entries(sortOptions).map(([key, value]) => (
              <option value={key} key={key}>
                {value}
              </option>
            ))}
          </SortedSelect>
        </ListTItleContainer>
        <CardContainer>
          {lostItems.map((lostItem) => (
            <LostItemCard key={lostItem.id} lostItem={lostItem} />
          ))}
          <PageBtnContainer>
            <PageButton onClick={() => handlePageNum(-1)}>{'<'}</PageButton>
            <PageP>{`${page + 1}/${totalPage}`}</PageP>
            <PageButton onClick={() => handlePageNum(1)}>{'>'}</PageButton>
          </PageBtnContainer>
        </CardContainer>
      </ListLayout>
      {role === 'STUDENT_COUNCIL' && (
        <button
          type="button"
          onClick={() => {
            navigate('/lost-items/register');
          }}
        >
          분실물 등록하기
        </button>
      )}
      <FloatingButton />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border: 4px solid red;
`;

const SearchInput = styled.input``;
const ListLayout = styled.div``;
const ListTItleContainer = styled.div``;
const ListTitle = styled.p``;
const SortedSelect = styled.select``;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PageBtnContainer = styled.div`
  position: fixed;
  bottom: 30rem;
`;
const PageButton = styled.button``;
const PageP = styled.p`
  display: inline-block;
`;

export default LostItem;
