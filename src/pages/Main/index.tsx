import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BoothStatueImg from '../../assets/imgs/boothStatue.webp';
import LostItemStatueImg from '../../assets/imgs/lostitemStatue.webp';
import NoticeStatueImg from '../../assets/imgs/noticeStatue.webp';
import TimeTableStatueImg from '../../assets/imgs/timetableStatue.webp';
import MapStatueImg from '../../assets/imgs/mapStatue.webp';
import InstagramIconImg from '../../assets/icons/instagram_icon.webp';
import TicketIconImg from '../../assets/icons/ticket_icon.webp';
import { ReactComponent as MajestyLogo } from '../../assets/imgs/majesty_logo.svg';
import MajestySubLogo from '../../assets/imgs/majesty_sub_logo.webp';
import FloatingButton from '../../components/FloatingButton/index.tsx';
import InfoText from '../../components/InfoText.tsx';
import { MainButtonBgImg } from '../../types/index.ts';
import { getCurrentDate } from '../../utils/date/dateUtil.ts';
import { DateOnlyFormat } from '../../utils/date/format/DateOnlyFormat.ts';
import { downloadAppByDevice } from '../../utils/downloadAppUtil.ts';
import { openInstagram } from '../../utils/openLinkUtil.ts';
import Header from './Header.tsx';
import MainMenuButton from './MainMenuButton.tsx';
import Weather from './Weather.tsx';

const Main = () => {
  const navigate = useNavigate();

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <TitleLayout>
        <LogoLayout>
          <MajestyLogo />
          <img
            src={MajestySubLogo}
            alt="MajestySubLogo"
            width="78px"
            height="15px"
          />
        </LogoLayout>
        <p>{getCurrentDate(DateOnlyFormat).replace(/\./g, '/')}</p>
      </TitleLayout>
      <Weather />
      <InfoLayout>
        <InfoText>링크 바로가기</InfoText>
      </InfoLayout>
      <LinkLayout>
        <TicketFriendsContainer
          onClick={downloadAppByDevice}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={TicketIconImg}
            alt="TicketIconImg"
            width="24px"
            height="24px"
          />
          <TicketFriendsBtn type="button">
            <p>티켓프렌즈</p>
          </TicketFriendsBtn>
        </TicketFriendsContainer>
        <InstagramContainer
          onClick={openInstagram}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={InstagramIconImg}
            alt="InstagramIconImg"
            width="24px"
            height="24px"
          />
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
              src: MapStatueImg,
              text: '지도',
              bgimg: 'map' as MainButtonBgImg,
            },
            {
              to: '/booths',
              img: BoothStatue,
              src: BoothStatueImg,
              text: '부스정보',
              bgimg: 'booth' as MainButtonBgImg,
            },
            {
              to: '/timetable',
              img: TimeTableStatue,
              src: TimeTableStatueImg,
              text: '타임테이블',
              bgimg: 'timetable' as MainButtonBgImg,
            },
            {
              to: '/view/all-notices',
              img: NoticeStatue,
              src: NoticeStatueImg,
              text: '공지사항',
              bgimg: 'notice' as MainButtonBgImg,
            },
            {
              to: '/lost-items',
              img: LostItemStatue,
              src: LostItemStatueImg,
              text: '분실물 찾기',
              bgimg: 'lostItem' as MainButtonBgImg,
            },
          ].map((item, index) => (
            <ButtonBox
              key={item.text}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={item.to}>
                <item.img
                  src={item.src}
                  alt={item.src}
                  width="104px"
                  height="104px"
                />
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

const MapStatue = styled.img`
  position: absolute;
  bottom: -3px;
  left: -1px;
  z-index: 20;
`;

const BoothStatue = styled.img`
  position: absolute;
  right: -2px;
  bottom: -4px;
  z-index: 20;
`;

const TimeTableStatue = styled.img`
  position: absolute;
  left: -2px;
  bottom: -3px;
  z-index: 20;
`;

const NoticeStatue = styled.img`
  position: absolute;
  right: -2px;
  bottom: -3px;
  z-index: 20;
`;

const LostItemStatue = styled.img`
  position: absolute;
  z-index: 20;
`;
export default Main;
