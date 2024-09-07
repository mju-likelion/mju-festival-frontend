import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Layout>
        <button type="button" onClick={() => navigate('/')}>
          뒤로가기
        </button>
      </Layout>
      <Title>공지사항</Title>
      <p>실시간으로 올라오는 공지사항을 확인해보세요!</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: pink;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const Layout = styled.div`
  display: flex;
`;

const Title = styled.h2`
  font-size: 24px;
`;

export default Header;
