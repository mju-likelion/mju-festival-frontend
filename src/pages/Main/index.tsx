import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InfoText from '../../components/InfoText.tsx';
import MainMenuButton from './MainMenuButton.tsx';
import { downloadAppByDevice } from '../../utils/downloadAppUtil.ts';
import { ReactComponent as MajestyLogo } from '../../assets/imgs/majesty_logo.svg';
import { ReactComponent as MajestySubLogo } from '../../assets/imgs/majesty_sub_logo.svg';
import { ReactComponent as TicketIconImg } from '../../assets/imgs/ticket_icon.svg';
import { ReactComponent as InstagramIconImg } from '../../assets/imgs/instagram_icon.svg';
import { ReactComponent as MapStatueImg } from '../../assets/imgs/mapStatue.svg';
import { ReactComponent as BoothStatueImg } from '../../assets/imgs/boothStatue.svg';
import { ReactComponent as TimeTableStatueImg } from '../../assets/imgs/timetableStatue.svg';
import { ReactComponent as NoticeStatueImg } from '../../assets/imgs/noticeStatue.svg';
import { ReactComponent as LostItemStatueImg } from '../../assets/imgs/lostitemStatue.svg';

const Main = () => {
  const navigate = useNavigate();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const TODAY = `${year} / ${month} / ${day}`;

  return (
    <Wrapper>
      <Header>
        <LogoLayout>
          <MajestyLogo />
          <MajestySubLogo />
        </LogoLayout>
        <p>{TODAY}</p>
      </Header>
      <InfoText>링크 바로가기</InfoText>
      <LinkLayout>
        <TicketFriendsContainer>
          <TicketIcon />
          <TicketFriendsBtn type="button" onClick={() => downloadAppByDevice()}>
            <p>티켓프렌즈</p>
          </TicketFriendsBtn>
        </TicketFriendsContainer>
        <InstagramContainer>
          <InstagramIcon />
          <InstagramBtn
            href={import.meta.env.VITE_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>학생회 인스타</p>
          </InstagramBtn>
        </InstagramContainer>
      </LinkLayout>
      <InfoText>축제 정보</InfoText>
      <FestivalInfoLayout>
        <BackgroundColor />
        <ButtonContainer>
          <ButtonBox>
            <MapStatue />
            <MainMenuButton
              bgimg="map"
              type="button"
              onClick={() => navigate('/')}
            >
              지도
            </MainMenuButton>
          </ButtonBox>
          <ButtonBox>
            <BoothStatue />
            <MainMenuButton
              bgimg="booth"
              type="button"
              onClick={() => navigate('/booths')}
            >
              부스정보
            </MainMenuButton>
          </ButtonBox>
          <ButtonBox>
            <TimeTableStatue />
            <MainMenuButton
              bgimg="timetable"
              type="button"
              onClick={() => navigate('/')}
            >
              타임테이블
            </MainMenuButton>
          </ButtonBox>
          <ButtonBox>
            <NoticeStatue />
            <MainMenuButton
              bgimg="notice"
              type="button"
              onClick={() => navigate('/view/all-notices')}
            >
              공지사항
            </MainMenuButton>
          </ButtonBox>
          <ButtonBox>
            <LostItemStatue />
            <MainMenuButton
              bgimg="lostItem"
              type="button"
              onClick={() => navigate('/lost-items')}
            >
              분실물 찾기
            </MainMenuButton>
          </ButtonBox>
        </ButtonContainer>
      </FestivalInfoLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  p {
    margin-top: 3px;
  }
`;

const LogoLayout = styled.div`
  display: flex;
  flex-direction: column;

  svg:nth-child(1) {
    margin-bottom: 4px;
  }
`;
// 링크 바로가기
const LinkLayout = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 9px;
`;

const TicketFriendsContainer = styled.div`
  display: flex;
  width: 100%;
`;

const TicketFriendsBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.blue200};
  width: 100%;
  height: 52px;
  border-radius: 12px;
  position: relative;
  z-index: 10;

  p {
    width: 121px;
    margin: 16px 17px 16px 42px;
    font-size: 17px;
    color: ${({ theme }) => theme.colors.white100};
    font-weight: 600;
  }
`;

const TicketIcon = styled(TicketIconImg)`
  position: absolute;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  z-index: 20;
  margin: 14px 4px 14px 14px;
`;

const InstagramContainer = styled.div`
  width: 100%;
`;

const InstagramBtn = styled.a`
  background-color: ${({ theme }) => theme.colors.blue200};
  width: 100%;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
  z-index: 10;

  p {
    width: 121px;
    margin: 16px 17px 16px 42px;
    font-size: 17px;
    color: ${({ theme }) => theme.colors.white100};
    font-weight: 600;
    text-align: center;
  }
`;

const InstagramIcon = styled(InstagramIconImg)`
  position: absolute;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  z-index: 20;
  margin: 14px 4px 14px 14px;
`;

// 축제 정보
const FestivalInfoLayout = styled.div`
  margin-bottom: 106px;
`;

const BackgroundColor = styled.div`
  position: absolute;
  background: linear-gradient(
    to bottom,
    rgba(158, 199, 255, 0.7) 0%,
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

const ButtonBox = styled.div`
  position: relative;
  height: 104px;
`;

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
  transform: scaleX(-1);
  z-index: 20;
`;

const NoticeStatue = styled(NoticeStatueImg)`
  position: absolute;
  right: -2px;
  bottom: -3px;
  z-index: 20;
`;

const LostItemStatue = styled(LostItemStatueImg)`
  position: absolute;
  bottom: -3px;
  z-index: 20;
`;
export default Main;
