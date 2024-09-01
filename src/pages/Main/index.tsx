import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { downloadAppByDevice } from '../../utils/downloadAppUtil.ts';

const Main = () => {
  const navigate = useNavigate();

  const today = new Date();
  const TODAY = today.toLocaleDateString().replace(/\./g, ' / ').slice(0, -3);

  return (
    <Wrapper>
      <Header>
        <p>로고자리</p>
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
        <BaseButton type="button" onClick={() => navigate('/lostItems')}>
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
