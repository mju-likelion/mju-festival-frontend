import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { ReactComponent as MenuIconSvg } from '../../assets/icons/hamburger.svg';

const Header = () => {
  const { role } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Wrapper>
      {role === 'STUDENT_COUNCIL' || role === 'BOOTH_MANAGER' ? (
        <Role>관리자용 </Role>
      ) : (
        <Placeholder>
          <button type="button" onClick={() => navigate('/login')}>
            로그인
          </button>
        </Placeholder>
      )}
      <MenuIcon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px 14px 20px;
`;

const Role = styled.p`
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.subhead2};
`;
const Placeholder = styled.div`
  width: 80px;
`;

const MenuIcon = styled(MenuIconSvg)`
  cursor: pointer;
`;

export default Header;
