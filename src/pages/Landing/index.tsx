import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LandingContent } from '../../assets/imgs/landing_header_content.svg';
import { ReactComponent as LandingTitleLogo } from '../../assets/imgs/landing_title.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/landing_right_arrow.svg';
import { ReactComponent as MJULogo } from '../../assets/imgs/landing_mju_logo.svg';
import landingBg from '../../assets/imgs/landing_Bg.webp';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <TitleLayout>
        <LandingContent />
        <LandingTitleLogo />
      </TitleLayout>
      <LoginContainer>
        <LogInBtn onClick={() => navigate('/login')}>로그인하러가기</LogInBtn>

        <MainBox>
          <MainBtn onClick={() => navigate('/main')}>
            로그인 없이 이용하기
            <RightArrow />
          </MainBtn>
        </MainBox>
      </LoginContainer>
      <MJULogo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 20.37%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(${landingBg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  padding: 151px 16px 44px 16px;
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 358px;
  margin-top: 155px;
  margin-bottom: 88px;
`;

const LogInBtn = styled.button`
  width: 100%;
  max-width: 358px;
  height: 52px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.blue100};
  color: ${({ theme }) => theme.colors.white100};
`;

const MainBtn = styled.button`
  display: flex;

  align-items: center;
  color: ${({ theme }) => theme.colors.white100};
  ${({ theme }) => theme.typographies.footnote};
`;

const MainBox = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export default Landing;
