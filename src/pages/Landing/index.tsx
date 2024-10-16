import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as RightArrow } from '../../assets/icons/landing_right_arrow.svg';
import landingBg from '../../assets/imgs/landing_Bg.webp';
import { ReactComponent as LandingContent } from '../../assets/imgs/landing_header_content.svg';
import { ReactComponent as MJULogo } from '../../assets/imgs/landing_mju_logo.svg';
import { ReactComponent as LandingTitleLogo } from '../../assets/imgs/landing_title.svg';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Wrapper
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
      }}
    >
      <TitleLayout
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } },
        }}
      >
        <LandingContent />
        <LandingTitleLogo />
      </TitleLayout>
      <LoginLayout
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <LogInBtn
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          onClick={() => navigate('/login')}
        >
          로그인하러가기
        </LogInBtn>
        <MainBox>
          <MainBtn onClick={() => navigate('/main')}>
            로그인 없이 이용하기
            <RightArrow />
          </MainBtn>
        </MainBox>
      </LoginLayout>
      <LogoLayout
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <MJULogo />
      </LogoLayout>
    </Wrapper>
  );
};

const Wrapper = motion(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${landingBg});
  background-size: cover;
  background-position: center;
  width: 100%;
  /* height: 100vh; */
  min-height: 100vh;
  padding: 151px 16px 44px 16px;
`);

const TitleLayout = motion(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
`);

const LoginLayout = motion(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 358px;
  margin-top: 155px;
  flex-grow: 1;
`);

const LogInBtn = motion(styled.button`
  width: 100%;
  max-width: 358px;
  height: 52px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.blue100};
  color: ${({ theme }) => theme.colors.white100};
`);

const MainBtn = styled.button`
  margin-top: 16px;
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

const LogoLayout = motion(styled.div`
  padding-top: 88px;
`);
export default Landing;
