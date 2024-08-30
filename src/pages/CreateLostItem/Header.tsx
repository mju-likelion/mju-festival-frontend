import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const navigate = useNavigate();

  const moveBackPage = () => {
    navigate(-1);
  };
  return (
    <Wrapper>
      <Layout>
        <BackButton onClick={moveBackPage}>뒤로 가기</BackButton>
        <RoleText>관리자용</RoleText>
      </Layout>
      <Title>분실물 찾기</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
`;
const Layout = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BackButton = styled.button``;
const RoleText = styled.p``;
const Title = styled.p``;

export default Header;
