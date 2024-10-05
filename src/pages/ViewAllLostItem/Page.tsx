import styled from 'styled-components';
import { ReactComponent as LeftArrowActive } from '../../assets/icons/left_arrow_active.svg';
import { ReactComponent as RightArrowActive } from '../../assets/icons/right_arrow_active.svg';

interface PageProps {
  page: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Page = ({ page, totalPage, setPage }: PageProps) => {
  const isPageValid = (nextPage: number) =>
    nextPage >= 0 && nextPage < totalPage;

  const handlePageNum = (num: 1 | -1) => {
    setPage((prev) => {
      const nextPage = prev + num;
      return isPageValid(nextPage) ? nextPage : prev;
    });
  };

  const currentPage = totalPage > 0 ? page + 1 : 0;

  return (
    <PageWrapper>
      <PageButton as={LeftArrowActive} onClick={() => handlePageNum(-1)} />
      <PageNum>{`${currentPage}/${totalPage}`}</PageNum>
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
