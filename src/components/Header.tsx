import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MenuIconSvg } from '../assets/icons/hamburger.svg';
import { ReactComponent as BackIcon } from '../assets/icons/left_arrow.svg';
import { useAuthStore } from '../store';

interface HeaderProps {
  path: string | number;
}

const Header = ({ path }: HeaderProps) => {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  const handleBackClick = () => {
    if (typeof path === 'number') {
      navigate(path); // 뒤로가기
    } else {
      navigate(path); // 문자열 경로 이동
    }
  };

  return (
    <Wrapper>
      <BackButton onClick={handleBackClick}>
        <BackIcon />
        뒤로가기
      </BackButton>
      <AdminMenuLayout>
        {(role === 'STUDENT_COUNCIL' || role === 'BOOTH_MANAGER') && (
          <Role>관리자용</Role>
        )}
        <MenuIcon onClick={() => navigate('/setting')} />
      </AdminMenuLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  z-index: 999;
  padding: 4px 20px 0 11px; // bottom: 0 - 각자 페이지 조절
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

const MenuIcon = styled(MenuIconSvg)`
  cursor: pointer;
`;

export default Header;
