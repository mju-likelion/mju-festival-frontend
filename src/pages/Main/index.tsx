import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as FooterHomeIcon } from '../../assets/icons/footer_home_icon.svg';
import { ReactComponent as FooterLinkIcon } from '../../assets/icons/footer_link_icon.svg';
import { ReactComponent as FooterMJUIcon } from '../../assets/icons/footer_mju_logo.svg';
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
import { openInstagram } from '../../utils/openInstaUtil.ts';
import Header from './Header.tsx';
import MainMenuButton from './MainMenuButton.tsx';
import Weather from './Weather.tsx';

const Main = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header />
      <TitleLayout>
        <LogoLayout>
          <MajestyLogo />
          <MajestySubLogo />
        </LogoLayout>
        <p>{getCurrentDate()}</p>
      </TitleLayout>
      <Weather />
      <InfoLayout>
        <InfoText>링크 바로가기</InfoText>
      </InfoLayout>
      <LinkLayout>
        <TicketFriendsContainer onClick={downloadAppByDevice}>
          <TicketIcon />
          <TicketFriendsBtn type="button">
            <p>티켓프렌즈</p>
          </TicketFriendsBtn>
        </TicketFriendsContainer>
        <InstagramContainer onClick={openInstagram}>
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
          <ButtonBox>
            <MapStatue />
            <MainMenuButton
              bgimg="map"
              type="button"
              onClick={() => navigate('/map')}
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
              onClick={() => navigate('/timetable')}
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
      <Footer>
        <ContentLayout>
          <IconContainer>
            <IconBox>
              <FooterLinkIcon />
              <p>https://www.mju.ac.kr/mjukr/index.do</p>
            </IconBox>
            <IconBox>
              <FooterHomeIcon />
              <p>https://open.kakao.com/o/sneAIT0f</p>
            </IconBox>
          </IconContainer>
          <FooterMJUIcon />
        </ContentLayout>
        <PeopleLayout>
          <PeopleContainer>
            <PeopleBox>
              <p>design</p>
              <p>김소현</p>
            </PeopleBox>
            <PeopleBox>
              <p>frontend</p>
              <p>오현의 이진혁 정혜인</p>
            </PeopleBox>
            <PeopleBox>
              <p>backend</p>
              <p>김대현</p>
            </PeopleBox>
          </PeopleContainer>
          <PeopleContainer>
            <PeopleBox>
              <p>총학생회장</p>
              <p>이승준</p>
            </PeopleBox>
            <PeopleBox>
              <p>홍보국장</p>
              <p>이우진</p>
            </PeopleBox>
            <PeopleBox>
              <p>대외협력국장</p>
              <p>이채영</p>
            </PeopleBox>
          </PeopleContainer>
        </PeopleLayout>
      </Footer>
      <FloatingButton />
    </Wrapper>
  );
};

const PeopleLayout = styled.div`
  display: flex;
  padding-right: 36px;
`;
const PeopleContainer = styled.div`
  padding-top: 4px;
`;

const PeopleBox = styled.div`
  display: flex;
  width: 100%;
  width: 167px;
  height: 16px;
  gap: 4px;

  p:nth-of-type(1) {
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white100};
  }
  p:nth-of-type(2) {
    font-size: 11px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.white100};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

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

const TicketFriendsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.blue200};
  border-radius: 12px;
  padding: 14px;
`;

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

const InstagramContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.blue200};
  border-radius: 12px;
  padding: 14px;
`;

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

const Footer = styled.div`
  width: 100%;
  height: 140px;
  background-color: ${({ theme }) => theme.colors.text900};
  padding: 14px 14px 16px 20px;
`;

const ContentLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  p {
    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.white100};
  }
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
