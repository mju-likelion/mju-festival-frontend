import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteUser } from '../../api/setting';
import { useAuthStore } from '../../store';
import { handleError } from '../../utils/errorUtil';
import Header from './Header';
import Modal from './Modal';

const Setting = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role, token, setRole, setToken } = useAuthStore();

  const logout = () => {
    if (window.confirm('로그아웃 할까요?')) {
      setRole('');
      setToken('');
    }
    navigate('/main');
  };

  const handleWithdraw = async () => {
    try {
      await deleteUser(token);
      navigate('/main');
    } catch (error) {
      handleError(error as Error);
    }
  };

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
        {role !== '' && (
          <>
            <LogOutButton onClick={() => logout()}>로그아웃</LogOutButton>
            <WithdrawButton
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              탈퇴하기
            </WithdrawButton>
          </>
        )}
      </ButtonLayout>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          handleWithdraw={handleWithdraw}
        />
      )}
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
