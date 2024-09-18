import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogInForm from './LogInForm.tsx';
import { ReactComponent as Logo } from '../../assets/imgs/logo.svg';
import { ReactComponent as SubTitleLogo } from '../../assets/imgs/logo_subtitle.svg';

const UserLogIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const onClick = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <>
      {isModalOpen && (
        <Modal>
          <Title>안내드립니다</Title>
          <Content>
            본 서비스는 축제 기간 동안 <br />
            사용하실 수 있으며, 축제 종료 후에는
            <br />
            자동으로 탈퇴됩니다.
          </Content>
          <Button type="button" onClick={() => onClick()}>
            확인하기
          </Button>
        </Modal>
      )}
      <Wrapper $isModalOpen={isModalOpen}>
        <LogoWrapper>
          <Logo width={126} />
          <SubTitleLogo />
        </LogoWrapper>
        <LogIn>LOGIN</LogIn>
        <LogInForm setIsModalOpen={setIsModalOpen} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ $isModalOpen: boolean }>`
  padding: 0 20px;
  background-color: ${({ $isModalOpen, theme }) =>
    $isModalOpen ? theme.colors.black10 : theme.colors.white100};
`;
const LogoWrapper = styled.div`
  margin-top: 58px;
  display: flex;
  flex-direction: column;
`;
const LogIn = styled.p`
  margin: 80px 0 32px;
  text-align: center;
  color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.typographies.largeTitle};
`;
const Modal = styled.div`
  max-width: 330px;
  width: calc(100vw - 60px);
  height: 238px;
  padding: 28px 38px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 250px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white100};
`;
const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
`;
const Content = styled.p`
  ${({ theme }) => theme.typographies.body2};
  line-height: 20px;
  white-space: pre-wrap;
`;
const Button = styled.button`
  width: 180px;
  padding: 16px;
  border-radius: 12px;
  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
`;

export default UserLogIn;
