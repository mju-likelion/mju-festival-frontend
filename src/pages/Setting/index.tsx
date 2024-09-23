import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';

const Setting = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header />
      <TitleLayout>
        <Title>설정</Title>
        <SubTitle>설정하기</SubTitle>
      </TitleLayout>
      <ButtonLayout>
        <LogInButton onClick={() => navigate('/login')}>
          로그인 페이지
        </LogInButton>
        <LogOutButton>로그인</LogOutButton>
        <WithdrawButton>탈퇴하기</WithdrawButton>
      </ButtonLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 20px 174px 20px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.text900};
`;

const SubTitle = styled.p`
  ${({ theme }) => theme.typographies.callout};
  color: ${({ theme }) => theme.colors.text900};
  margin-top: 9px;
`;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 0 20px 200px 20px;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 12px;

  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.white100};
  padding: 16px 61px;
`;

const LogInButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.blue100};
`;
const LogOutButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.blue100};
`;
const WithdrawButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.gray500};
`;

export default Setting;
