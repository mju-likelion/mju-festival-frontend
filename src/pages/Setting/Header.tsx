import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MenuIconSvg } from '../../assets/icons/hamburger.svg';
import { useAuthStore } from '../../store';

const Header = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  return (
    <Wrapper>
      <AdminMenuLayout>
        {(role === 'STUDENT_COUNCIL' || role === 'BOOTH_MANAGER') && (
          <Role>관리자용</Role>
        )}
        <MenuIcon onClick={() => navigate(-1)} />
      </AdminMenuLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: flex-end;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  z-index: 999;
  padding: 4px 20px 0 20px;
`;

const AdminMenuLayout = styled.div`
  justify-self: flex-end;
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 7px;
`;

const Role = styled.p`
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.subhead2};
`;

const MenuIcon = styled(MenuIconSvg)`
  cursor: pointer;
`;

export default Header;
