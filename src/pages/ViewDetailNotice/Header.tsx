import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../store';

const Header = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  return (
    <Wrapper>
      <Layout>
        <button type="button" onClick={() => navigate(-1)}>
          뒤로가기
        </button>
        {role === 'STUDENT_COUNCIL' && <p>관리자용</p>}
      </Layout>
      <Title>공지사항</Title>
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
