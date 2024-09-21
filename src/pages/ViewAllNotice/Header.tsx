import styled from 'styled-components';
import Header from '../../components/Header.tsx';

const TitleLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Box>
        <p>공지사항</p>
        <p>실시간으로 올라오는 공지사항을 확인해보세요!</p>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 26px 0 0 20px;

  p:nth-of-type(1) {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text900};
  }
  p:nth-of-type(2) {
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text900};
  }
`;

export default TitleLayout;
