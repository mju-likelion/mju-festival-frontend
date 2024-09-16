import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../store';
import { ReactComponent as backIconImg } from '../../assets/icons/backIcon.svg';
import { ReactComponent as hamburgerMenuImg } from '../../assets/icons/hamburgerMenu.svg';

interface HeaderProps {
  children: React.ReactNode;
}
const Header = ({ children }: HeaderProps) => {
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
        <HamburgerMenu />
      </Layout>
      <Title>{children}</Title>
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
  display: flex;
  align-items: center;
  margin-left: 11px;
  margin-top: 4px;

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text500};
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text900};
  padding: 16px 300px 9px 20px;
  white-space: nowrap;
`;

const BackIcon = styled(backIconImg)``;
const HamburgerMenu = styled(hamburgerMenuImg)``;

export default Header;
