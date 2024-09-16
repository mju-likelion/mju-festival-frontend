import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../store';
import { ReactComponent as backIconImg } from '../../assets/icons/backIcon.svg';

const Header = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  return (
    <Wrapper>
      <Layout>
        <BackBtnContainer onClick={() => navigate(-1)}>
          <BackIcon />
          <p>뒤로가기</p>
        </BackBtnContainer>
        {role === 'STUDENT_COUNCIL' && <p>관리자용</p>}
      </Layout>
      <Title>공지사항</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 999;
  border: 1px solid red;
`;

const Layout = styled.div`
  display: flex;
`;

const BackBtnContainer = styled.div`
  border: 1px solid skyblue;
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
`;

const BackIcon = styled(backIconImg)``;

export default Header;
