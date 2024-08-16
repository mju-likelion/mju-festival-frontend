import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <LinkLayout>
        <button type="button" onClick={() => navigate('/')}>
          티켓프렌즈
        </button>
        <button type="button" onClick={() => navigate('/')}>
          학생회 인스타
        </button>
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
        <BaseButton type="button" onClick={() => navigate('/')}>
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
