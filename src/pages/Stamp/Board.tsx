import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { getStamp } from '../../api/Stamp';
import { ReactComponent as StampActive } from '../../assets/icons/stamp_active.svg';
import { ReactComponent as StampDisabled } from '../../assets/icons/stamp_disabled.svg';
import plant from '../../assets/imgs/stamp_plant.png';
import { useAuthStore } from '../../store';
import { handleError } from '../../utils/errorUtil';

const Board = () => {
  const [stampCount, setStampCount] = useState(0);
  const [totalStampCount, setTotalStampCount] = useState(25); // 기본값으로 25 설정
  const { token } = useAuthStore();
  const stampLayout = [3, 2, 3, 2, 3, 2, 3, 2, 3, 1];

  const stamps = useMemo(
    () =>
      Array.from({ length: totalStampCount }, (_, index) => ({
        id: `stamp-${index}`,
        completed: index < stampCount,
      })),
    [stampCount, totalStampCount]
  );

  const fetchStampData = async () => {
    try {
      const stampData = await getStamp(token);

      if (stampData) {
        setStampCount(stampData.stampCount);
        setTotalStampCount(stampData.totalStampCount);
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  useEffect(() => {
    fetchStampData();
  }, [token]);

  return (
    <Wrapper>
      <StampTitleLayout>
        <StampTitle>도장을 열심히 모아봐요</StampTitle>
        <StampNum>
          현재까지 모은 도장 : <span>{stampCount}</span>개
        </StampNum>
      </StampTitleLayout>
      <StampLayout>
        {stampLayout.reduce((rows, rowLength) => {
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
      <Plant src={plant} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 21px;
  width: 100%;
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
