import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MenuIconSvg } from '../../assets/icons/hamburger.svg';
import { useAuthStore } from '../../store';

const Header = () => {
  const { role, setRole, setToken } = useAuthStore();
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm('로그아웃 할까요?')) {
      setRole('');
      setToken('');
    }
  };

  return (
    <Wrapper>
      {(role === 'STUDENT_COUNCIL' || role === 'BOOTH_MANAGER') && (
        <Role>관리자용 </Role>
      )}
      {role === '' ? (
        <AuthButton type="button" onClick={() => navigate('/login')}>
          로그인
        </AuthButton>
      ) : (
        <AuthButton onClick={() => logout()}>로그아웃</AuthButton>
      )}
      <MenuIcon onClick={() => navigate('/setting')} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  padding: 14px 20px 14px 20px;
`;

const Role = styled.p`
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.subhead2};
`;
const AuthButton = styled.button`
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.subhead2};
`;
const MenuIcon = styled(MenuIconSvg)`
  margin-left: auto;
  cursor: pointer;
`;

export default Header;
