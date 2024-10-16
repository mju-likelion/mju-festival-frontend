import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LogInForm from './LogInForm.tsx';
import { ReactComponent as Logo } from '../../assets/imgs/logo.svg';
import { ReactComponent as SubTitleLogo } from '../../assets/imgs/logo_subtitle.svg';
import { ReactComponent as BackIcon } from '../../assets/icons/left_arrow.svg';

const AdminLogIn = () => {
  const navigate = useNavigate();
  return (
    <>
      <BackButton role="button" onClick={() => navigate('/login')}>
        <BackIcon />
        뒤로가기
      </BackButton>
      <Wrapper>
        <Header>
          <LogoWrapper onClick={() => navigate('/main')}>
            <Logo width={126} />
            <SubTitleLogo />
          </LogoWrapper>
          <Role>관리자용</Role>
        </Header>
        <LogIn>LOGIN</LogIn>
        <LogInForm setIsModalOpen={() => {}} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding: 0 20px 305px 20px;
  background-color: ${({ theme }) => theme.colors.white100};
`;
const Header = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;
const Role = styled.p`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.subhead2};
`;
const BackButton = styled.div`
  padding: 4px 10px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.footnote};
`;
const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
const LogIn = styled.p`
  margin: 80px 0 32px;
  text-align: center;
  color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.typographies.largeTitle};
`;

export default AdminLogIn;
