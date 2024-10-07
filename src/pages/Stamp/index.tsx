import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as DownArrow } from '../../assets/icons/down_arrow.svg';
import { ReactComponent as UpArrow } from '../../assets/icons/up_arrow.svg';
import Header from '../../components/Header';
import InfoText from '../../components/InfoText';
import Board from './Board';

const Stamp = () => {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleOpenList = () => {
    setIsListOpen((prev) => !prev);
  };

  return (
    <Wrapper>
      <Header path={-1} />
      <TitleLayout>
        <Title>도장판</Title>
        <SubTitle>
          부스에서 도장을 찍고 도장을 모두 모아
          <br />
          응모권을 모아보세요! 사은품의 주인공이 되어 보세요!
        </SubTitle>
      </TitleLayout>
      <InfoText>도장판</InfoText>
      <Board />
      <BoothListLayout>
        <TitleContainer onClick={handleOpenList}>
          <ListTitle>도장판 부스 목록</ListTitle>
          {isListOpen ? <DownArrow /> : <UpArrow />}
        </TitleContainer>
        {isListOpen && (
          <ListContent>
            예체대(예술편)부스, ICeTime, 추억의 간식 콜팝 & 나초까지 먹을래연~
            말래연?, 만쥬만져, 오늘은 건축왕 !, 마제스티조인, 수아정, 나랑
            두바이 갈래?, 라떼는 슈감자, 솜사탕카페, 아날로그 집적 타르트 설계,
            균형 마스터: 흔들림 없는 도전, 상금은 타자 치고, 화학공학과
            물약상점, 카페 마제스팅, 건축학부
          </ListContent>
        )}
      </BoothListLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  padding-bottom: 70px;
  background-color: ${({ theme }) => theme.colors.white100};
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 23px 33px 29px 20px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.text900};
`;

const SubTitle = styled.p`
  ${({ theme }) => theme.typographies.callout};
  color: ${({ theme }) => theme.colors.text900};
  margin-top: 9px;
`;

const BoothListLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 27px;
  min-height: 170px;
  padding: 0 30px;
  color: ${({ theme }) => theme.colors.blue100};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const ListTitle = styled.p`
  ${({ theme }) => theme.typographies.subhead1};
`;

const ListContent = styled.p`
  ${({ theme }) => theme.typographies.subhead2};
  text-align: center;
  line-height: 20px;
`;

export default Stamp;
