import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getStamp } from '../../api/stamp.ts';
import { ReactComponent as StampActive } from '../../assets/icons/stamp_active.svg';
import { ReactComponent as StampDisabled } from '../../assets/icons/stamp_disabled.svg';
import { useAuthStore } from '../../store';
import { handleError } from '../../utils/errorUtil';

const Board = () => {
  const [participatedBoothNames, setParticipatedBoothNames] = useState([]);
  const [boothsCountToComplete, setBoothsCountToComplete] = useState(5);
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const STAMP_LAYOUT = [3, 2];

  const stamps = useMemo(() => {
    const completedCount = participatedBoothNames.length;
    return Array.from({ length: boothsCountToComplete }, (_, index) => ({
      id: `stamp-${index}`,
      completed: index < completedCount,
      boothName: participatedBoothNames[index] || null,
    }));
  }, [participatedBoothNames, boothsCountToComplete]);

  const fetchStampData = async () => {
    try {
      const stampData = await getStamp(token);

      if (stampData) {
        setParticipatedBoothNames(stampData.participatedBoothNames);
        setBoothsCountToComplete(stampData.boothsCountToComplete);
      }
    } catch (error) {
      handleError(error as Error);
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchStampData();
  }, [token]);

  useEffect(() => {
    if (participatedBoothNames.length >= boothsCountToComplete) {
      navigate('/completed-stamps');
    }
  }, [participatedBoothNames, boothsCountToComplete]);

  return (
    <Wrapper>
      <TitleLayout>
        <Title>도장을 열심히 모아봐요</Title>
      </TitleLayout>

      <StampLayout>
        {STAMP_LAYOUT.map((rowLength, rowIndex) => {
          const startIndex = STAMP_LAYOUT.slice(0, rowIndex).reduce(
            (sum, len) => sum + len,
            0
          );
          const rowStamps = stamps.slice(startIndex, startIndex + rowLength);

          return (
            <StampRow key={`row-${rowLength}`}>
              {rowStamps.map((stamp) => (
                <StampContainer key={stamp.id}>
                  <StampBackground>
                    {stamp.completed ? <StampActive /> : <StampDisabled />}
                  </StampBackground>
                  {stamp.completed && stamp.boothName && (
                    <BoothName>{stamp.boothName}</BoothName>
                  )}
                </StampContainer>
              ))}
            </StampRow>
          );
        })}
      </StampLayout>

      <NumLayout>
        <StampNum>
          현재까지 모은 도장 :
          <span>
            {Math.min(participatedBoothNames.length, boothsCountToComplete)}
          </span>
          개
        </StampNum>
        <StampNum>
          남은 도장의 개수 :
          <span>
            {Math.max(boothsCountToComplete - participatedBoothNames.length, 0)}
          </span>
          개
        </StampNum>
      </NumLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 21px;
  width: 100%;
  height: 476px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 21px;
  padding: 24px 24px 61px 24px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.blue100};
`;

const StampLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const StampRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StampContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
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

const BoothName = styled.p`
  ${({ theme }) => theme.typographies.footnote};
  color: ${({ theme }) => theme.colors.blue100};

  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NumLayout = styled.div`
  margin-top: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const StampNum = styled.p`
  ${({ theme }) => theme.typographies.subhead2};
  color: ${({ theme }) => theme.colors.blue100};
`;

export default Board;
