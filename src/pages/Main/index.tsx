import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactComponent as BoothStatueImg } from '../../assets/imgs/boothStatue.svg';
import { ReactComponent as InstagramIconImg } from '../../assets/imgs/instagram_icon.svg';
import { ReactComponent as LostItemStatueImg } from '../../assets/imgs/lostitemStatue.svg';
import { ReactComponent as MajestyLogo } from '../../assets/imgs/majesty_logo.svg';
import { ReactComponent as MajestySubLogo } from '../../assets/imgs/majesty_sub_logo.svg';
import { ReactComponent as MapStatueImg } from '../../assets/imgs/mapStatue.svg';
import { ReactComponent as NoticeStatueImg } from '../../assets/imgs/noticeStatue.svg';
import { ReactComponent as TicketIconImg } from '../../assets/imgs/ticket_icon.svg';
import { ReactComponent as TimeTableStatueImg } from '../../assets/imgs/timetableStatue.svg';
import FloatingButton from '../../components/FloatingButton/index.tsx';
import InfoText from '../../components/InfoText.tsx';
import { getCurrentDate } from '../../utils/dateUtil';
import { downloadAppByDevice } from '../../utils/downloadAppUtil.ts';
import { openInstagram } from '../../utils/openLinkUtil.ts';
import Header from './Header.tsx';
import MainMenuButton from './MainMenuButton.tsx';
import Weather from './Weather.tsx';
import { MainButtonBgImg } from '../../types/index.ts';

const Main = () => {
  const navigate = useNavigate();

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header />
      <TitleLayout>
        <LogoLayout>
          <MajestyLogo />
          <MajestySubLogo />
        </LogoLayout>
        <p>{getCurrentDate().replace(/\./g, '/')}</p>
      </TitleLayout>
      <Weather />
      <InfoLayout>
        <InfoText>링크 바로가기</InfoText>
      </InfoLayout>
      <LinkLayout>
        <TicketFriendsContainer
          onClick={downloadAppByDevice}
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          whileTap={{ scale: 0.9 }}
        >
          <TicketIcon />
          <TicketFriendsBtn type="button">
            <p>티켓프렌즈</p>
          </TicketFriendsBtn>
        </TicketFriendsContainer>
        <InstagramContainer
          onClick={openInstagram}
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          whileTap={{ scale: 0.9 }}
        >
          <InstagramIcon />
          <InstagramBtn>
            <p>학생회 인스타</p>
          </InstagramBtn>
        </InstagramContainer>
      </LinkLayout>
      <InfoLayout>
        <InfoText>축제 정보</InfoText>
      </InfoLayout>
      <FestivalInfoLayout>
        <BackgroundColor />
        <ButtonContainer>
          {[
            {
              to: '/map',
              img: MapStatue,
              text: '지도',
              bgimg: 'map' as MainButtonBgImg,
            },
            {
              to: '/booths',
              img: BoothStatue,
              text: '부스정보',
              bgimg: 'booth' as MainButtonBgImg,
            },
            {
              to: '/timetable',
              img: TimeTableStatue,
              text: '타임테이블',
              bgimg: 'timetable' as MainButtonBgImg,
            },
            {
              to: '/view/all-notices',
              img: NoticeStatue,
              text: '공지사항',
              bgimg: 'notice' as MainButtonBgImg,
            },
            {
              to: '/lost-items',
              img: LostItemStatue,
              text: '분실물 찾기',
              bgimg: 'lostItem' as MainButtonBgImg,
            },
          ].map((item, index) => (
            <ButtonBox
              key={item.text}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
                delay: index * 0.1,
                type: 'spring',
                stiffness: 400,
                damping: 10,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to={item.to}>
                <item.img />
              </Link>
              <MainMenuButton
                bgimg={item.bgimg}
                type="button"
                onClick={() => navigate(item.to)}
              >
                {item.text}
              </MainMenuButton>
            </ButtonBox>
          ))}
        </ButtonContainer>
      </FestivalInfoLayout>
      <FloatingButton />
    </Wrapper>
  );
};

const Wrapper = motion(styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white100};
`);

const TitleLayout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  p {
    margin-top: 3px;
    ${({ theme }) => theme.typographies.subhead1};
    color: ${({ theme }) => theme.colors.text900};
  }
`;

const LogoLayout = styled.div`
  display: flex;
  flex-direction: column;

  svg:nth-child(1) {
    margin-bottom: 4px;
  }
`;

const InfoLayout = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 95px 28px 95px;
`;

// 링크 바로가기
const LinkLayout = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 9px;
`;

const TicketFriendsContainer = motion(styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: var(
    --gradient-02,
    linear-gradient(111deg, #365ac0 -56.21%, #4b82ef 143.67%)
  );
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
`);

const TicketFriendsBtn = styled.button`
  width: 100%;

  p {
    font-size: 17px;
    color: ${({ theme }) => theme.colors.white100};
    font-weight: 600;
    white-space: nowrap;
  }
`;

const TicketIcon = styled(TicketIconImg)`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const InstagramContainer = motion(styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: var(
    --gradient-02,
    linear-gradient(111deg, #365ac0 -56.21%, #4b82ef 143.67%)
  );
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
`);

const InstagramBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  p {
    font-size: 17px;
    color: ${({ theme }) => theme.colors.white100};
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
  }
`;

const InstagramIcon = styled(InstagramIconImg)`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  z-index: 20;
`;

// 축제 정보
const FestivalInfoLayout = styled.div`
  margin-bottom: 106px;
`;

const BackgroundColor = styled.div`
  position: absolute;
  background: linear-gradient(
    to bottom,
    rgba(158, 199, 255, 0.3) 0%,
    rgba(158, 199, 255, 0) 100%
  );
  width: 100%;
  height: 317px;
  z-index: 10;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${({ theme }) => theme.colors.white100};
  padding: 14px 20px 0 20px;
  z-index: 20;
`;

const ButtonBox = motion(styled.div`
  position: relative;
  height: 104px;
`);

const MapStatue = styled(MapStatueImg)`
  position: absolute;
  bottom: -3px;
  left: -1px;
  /* transform: scaleX(-1); */
  z-index: 20;
`;

const BoothStatue = styled(BoothStatueImg)`
  position: absolute;
  right: -2px;
  bottom: -3px;
  z-index: 20;
`;

const TimeTableStatue = styled(TimeTableStatueImg)`
  position: absolute;
  left: -2px;
  bottom: -3px;
  z-index: 20;
`;

const NoticeStatue = styled(NoticeStatueImg)`
  position: absolute;
  right: -2px;
  bottom: -4px;
  z-index: 20;
`;

const LostItemStatue = styled(LostItemStatueImg)`
  position: absolute;
  z-index: 20;
`;
export default Main;
