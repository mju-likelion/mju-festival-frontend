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
  const STAMP_LAYOUT = [3, 2];
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const stamps = useMemo(
    () =>
      Array.from({ length: boothsCountToComplete }, (_, index) => ({
        id: `stamp-${index}`,
        completed: index < participatedBoothNames.length,
      })),
    [participatedBoothNames, boothsCountToComplete]
  );

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
      <StampTitleLayout>
        <StampTitle>도장을 열심히 모아봐요</StampTitle>
        <StampSubTitle>도장판 부스</StampSubTitle>
      </StampTitleLayout>
      <StampLayout>
        {STAMP_LAYOUT.reduce((rows, rowLength) => {
          const rowStamps = stamps.splice(0, rowLength);
          rows.push(
            <StampRow key={`row-${rows.length}`}>
              {rowStamps.map((stamp) => (
                <StampBackground key={stamp.id}>
                  {stamp.completed ? <StampActive /> : <StampDisabled />}
                </StampBackground>
              ))}
            </StampRow>
          );
          return rows;
        }, [] as JSX.Element[])}
      </StampLayout>
      <StampNumLayout>
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
      </StampNumLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 21px;
  width: 100%;
  height: 522px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const StampTitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 21px;
  padding: 24px 24px 78px 24px;
`;

const StampTitle = styled.p`
  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.blue100};
`;

const StampSubTitle = styled(StampTitle)``;
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

const StampNumLayout = styled.div`
  margin-top: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const StampNum = styled.span`
  ${({ theme }) => theme.typographies.subhead2};
  color: ${({ theme }) => theme.colors.blue100};
`;

export default Board;
