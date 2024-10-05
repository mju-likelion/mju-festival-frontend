import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../store';
import { ReactComponent as backIconImg } from '../../assets/icons/backIcon.svg';
import { ReactComponent as hamburgerMenuImg } from '../../assets/icons/hamburgerMenu.svg';

interface HeaderProps {
  children: React.ReactNode;
  title: string;
}
const Header = ({ children, title }: HeaderProps) => {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  return (
    <Wrapper>
      <ButtonLayout>
        <BackBtnContainer onClick={() => navigate(-1)}>
          <BackIcon />
          <p>뒤로가기</p>
        </BackBtnContainer>
        <MenuBtnContainer>
          {role === 'STUDENT_COUNCIL' && <p>관리자용</p>}
          <HamburgerMenu />
        </MenuBtnContainer>
      </ButtonLayout>
      <TextLayout>
        <Title>{title}</Title>
        <SubTitle>{children}</SubTitle>
      </TextLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white100};
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BackBtnContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 11px;
  margin-top: 4px;

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text500};
  }
`;
const BackIcon = styled(backIconImg)`
  width: 24px;
  height: 24px;
`;

const MenuBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-right: 20px;
  margin-top: 14px;

  p {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.text500};
  }
`;
const HamburgerMenu = styled(hamburgerMenuImg)``;

const TextLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 6px 0 6px 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text900};
  white-space: nowrap;
`;

const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text900};
`;

export default Header;
