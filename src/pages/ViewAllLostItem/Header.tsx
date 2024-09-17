import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MenuIconSVG } from '../../assets/icons/hamburger.svg';
import { ReactComponent as BackIcon } from '../../assets/icons/left_arrow.svg';
import { useAuthStore } from '../../store';

const Header = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/')}>
        <BackIcon />
        뒤로가기
      </BackButton>
      <AdminMenuLayout>
        {(role === 'STUDENT_COUNCIL' || role === 'BOOTH_MANAGER') && (
          <Role>관리자용</Role>
        )}
        <MenuIcon />
      </AdminMenuLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 20px 23px 11px;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.footnote};
  cursor: pointer;
`;

const AdminMenuLayout = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 7px;
`;

const Role = styled.p`
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.subhead2};
`;

const MenuIcon = styled(MenuIconSVG)`
  cursor: pointer;
`;

export default Header;
