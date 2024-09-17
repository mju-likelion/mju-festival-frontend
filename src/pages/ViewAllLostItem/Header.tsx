import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '../../assets/icons/hamburger.svg';
import { ReactComponent as BackIcon } from '../../assets/icons/left_arrow.svg';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/')}>
        <BackIcon />
        뒤로가기
      </BackButton>
      <AdminMenuLayout>
        <Role>관리자용</Role>
        <MenuIcon />
      </AdminMenuLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 20px 23px 11px;
  border: 1px solid blue;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.footnote};
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

export default Header;
