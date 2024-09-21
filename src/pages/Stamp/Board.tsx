import styled from 'styled-components';
import { ReactComponent as StampActive } from '../../assets/icons/stamp_active.svg';
import plant from '../../assets/imgs/stamp_plant.png';

const stamps = Array.from({ length: 10 }, (_, index) => index);

const Board = () => {
  return (
    <Wrapper>
      <StampTitleLayout>
        <StampTitle>도장을 열심히 모아봐요</StampTitle>
        <StampNum>
          현재까지 모은 도장 : <span>10</span>개
        </StampNum>
      </StampTitleLayout>
      <StampLayout>
        <StampRow>
          {stamps.slice(0, 3).map((stamp) => (
            <StampBackground key={`stamp-${stamp}`}>
              <StampActive />
            </StampBackground>
          ))}
        </StampRow>
        <StampRow>
          {stamps.slice(3, 5).map((stamp) => (
            <StampBackground key={`stamp-${stamp}`}>
              <StampActive />
            </StampBackground>
          ))}
        </StampRow>
        <StampRow>
          {stamps.slice(5, 8).map((stamp) => (
            <StampBackground key={`stamp-${stamp}`}>
              <StampActive />
            </StampBackground>
          ))}
        </StampRow>
        <StampRow>
          {stamps.slice(8).map((stamp) => (
            <StampBackground key={`stamp-${stamp}`}>
              <StampActive />
            </StampBackground>
          ))}
        </StampRow>
      </StampLayout>
      <Plant src={plant} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 21px;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 220px);
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const StampTitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  padding: 24px 24px 26px 24px;
`;

const StampTitle = styled.p`
  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.blue100};
`;

const StampNum = styled.span`
  ${({ theme }) => theme.typographies.subhead2};
  color: ${({ theme }) => theme.colors.blue100};
`;

const StampLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const StampBackground = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white100};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StampRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Plant = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
`;
export default Board;
