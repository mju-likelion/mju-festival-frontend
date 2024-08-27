import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { getLostItem, getSearchLostItem } from '../../api/lostItem';
import LostItemCard from './LostItemCard';
import { SimpleLostItem, SortOptions, SortKey } from '../../types/lostItem';
import { useAuthStore } from '../../store';

const LostItem = () => {
  const [LostItems, setLostItems] = useState<SimpleLostItem[]>([]);
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim() !== '') {
      setPage(0);
      getSearchLostItem(
        sorted,
        keyword,
        page,
        SIZE,
        setLostItems,
        setTotalPage
      );
    } else {
      getLostItem(sorted, page, SIZE, setLostItems, setTotalPage);
    }
  };

  useEffect(() => {
    getLostItem(sorted, page, SIZE, setLostItems, setTotalPage);
  }, []);

  useEffect(() => {
    getSearchLostItem(sorted, keyword, page, SIZE, setLostItems, setTotalPage);
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
          {LostItems.map((lostItem) => (
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
            navigate('/lostItems/new');
          }}
        >
          분실물 등록하기
        </button>
      )}
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
