import styled from 'styled-components';
import { ReactComponent as LeftArrowActive } from '../../assets/icons/left_arrow_active.svg';
import { ReactComponent as RightArrowActive } from '../../assets/icons/right_arrow_active.svg';

interface PageProps {
  page: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Page = ({ page, totalPage, setPage }: PageProps) => {
  const handlePageNum = (num: number) => {
    setPage((prev) => {
      const nextPage = prev + num;

      if (nextPage < 0 || nextPage + 1 > totalPage) {
        return prev;
      }

      return nextPage;
    });
  };

  return (
    <PageWrapper>
      <PageButton as={LeftArrowActive} onClick={() => handlePageNum(-1)} />
      <PageNum>{`${page + 1}/${totalPage}`}</PageNum>
      <PageButton as={RightArrowActive} onClick={() => handlePageNum(1)} />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 14px;
  gap: 1px;
`;

const PageButton = styled.button`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const PageNum = styled.p`
  ${({ theme }) => theme.typographies.footout};
  color: ${({ theme }) => theme.colors.text900};
`;

export default Page;
