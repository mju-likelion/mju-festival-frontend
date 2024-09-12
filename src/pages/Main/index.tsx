import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { downloadAppByDevice } from '../../utils/downloadAppUtil.ts';
import { ReactComponent as MajestyLogo } from '../../assets/imgs/majesty_logo.svg';
import { ReactComponent as MajestySubLogo } from '../../assets/imgs/majesty_sub_logo.svg';
import { ReactComponent as TicketIconImg } from '../../assets/imgs/ticket_icon.svg';
import { ReactComponent as InstagramIconImg } from '../../assets/imgs/instagram_icon.svg';
import InfoText from './InfoText.tsx';

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
      <FestivalInfoLayout>
        <BaseButton type="button" onClick={() => navigate('/booths')}>
          부스정보
        </BaseButton>
        <BaseButton type="button" onClick={() => navigate('/')}>
          타임테이블
        </BaseButton>
        <BaseButton type="button" onClick={() => navigate('/')}>
          지도
        </BaseButton>
        <BaseButton type="button" onClick={() => navigate('/view/all-notices')}>
          공지사항
        </BaseButton>
        <BaseButton type="button" onClick={() => navigate('/lost-items')}>
          분실물찾기
        </BaseButton>
      </FestivalInfoLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  p {
    margin-left: 124px;
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

const LinkLayout = styled.div`
  border: 1px solid red;
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

const FestivalInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${({ theme }) => theme.colors.white100};
  padding: 20px;
  border: 1px solid skyblue;
`;

const BaseButton = styled.button`
  background-color: lightblue;
  border-radius: 8px;
`;

export default Main;
