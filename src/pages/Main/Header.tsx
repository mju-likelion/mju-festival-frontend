import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../store';
import { ReactComponent as MenuIconSvg } from '../../assets/icons/hamburger.svg';

const Header = () => {
  const { role } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Wrapper>
      {(role === 'STUDENT_COUNCIL' || role === 'BOOTH_MANAGER') && (
        <Role>관리자용 </Role>
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
const MenuIcon = styled(MenuIconSvg)`
  margin-left: auto;
  cursor: pointer;
`;

export default Header;
