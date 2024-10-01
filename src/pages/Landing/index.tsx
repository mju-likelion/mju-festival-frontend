import { motion } from 'framer-motion';
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import landingBg from '../../assets/imgs/landing_Bg.webp';
import LandingContent from '../../assets/imgs/landing_header_content.svg';
import MJULogo from '../../assets/imgs/landing_mju_logo.svg';
import LandingTitleLogo from '../../assets/imgs/landing_title.svg';

const Landing = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date('2024-10-06T00:00:00');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Img src={LandingContent} />
        <Img src={LandingTitleLogo} />
      </TitleLayout>
      <LoginLayout
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <Timer>
          OPEN : {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분{' '}
          {timeLeft.seconds}초
        </Timer>
      </LoginLayout>
      <LogoLayout
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <Img src={MJULogo} />
      </LogoLayout>
    </Wrapper>
  );
};

const Wrapper = motion(styled.div`
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

const Timer = motion(styled.div`
  width: 100%;
  max-width: 358px;
  height: 52px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  background-color: #939da6;
  color: #000000b3;
  display: flex;
  justify-content: center;
  align-items: center;
`);

const Img = styled.img``;

const LogoLayout = motion(styled.div`
  padding-top: 88px;
`);
export default Landing;
