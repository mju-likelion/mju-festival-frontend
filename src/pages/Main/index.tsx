import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { downloadAppByDevice } from '../../utils/downloadAppUtil.ts';
import { ReactComponent as MajestyLogo } from '../../assets/imgs/majesty_logo.svg';
import { ReactComponent as MajestySubLogo } from '../../assets/imgs/majesty_sub_logo.svg';

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
        <button type="button" onClick={() => downloadAppByDevice()}>
          티켓프렌즈
        </button>
        <a
          href={import.meta.env.VITE_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button type="button">학생회 인스타</button>
        </a>
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
`;

const FestivalInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid skyblue;
  color: white;
`;

const BaseButton = styled.button`
  background-color: lightblue;
  border-radius: 8px;
`;

export default Main;
