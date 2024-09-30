import styled from 'styled-components';
import { ReactComponent as TimetableHrImg } from '../../assets/imgs/timetable_hr.svg';
import { ReactComponent as Dashed } from '../../assets/imgs/timetable_dashed.svg';
import TypeIcon from './TypeIcon';

interface ClubPerformanceProps {
  date: string;
}

const ClubPerformData = {
  '10/07': [
    {
      type: '밴드',
      teamName: '마라톤',
    },
    {
      type: '밴드',
      teamName: '페가수스',
    },
    {
      type: '밴드',
      teamName: '이따위',
    },
    {
      type: '밴드',
      teamName: '우리또래',
    },
    {
      type: '밴드',
      teamName: '울림소리',
    },
  ],
  '10/08': [
    {
      type: '댄스',
      teamName: 'CDC',
    },
    {
      type: '힙합',
      teamName: '소울메이트',
    },
  ],
};

const ClubPerformance = ({ date }: ClubPerformanceProps) => {
  const performances = ClubPerformData[date] || [];

  return (
    <Wrapper>
      <InfoLayout>
        <Title>동아리 공연</Title>
        <TimetableHr />
        <Time>18:40 ~ 20:20</Time>
      </InfoLayout>
      <PerformanceList>
        {performances.map((performance) => (
          <PerformanceItem key={performance.teamName}>
            <TeamName>{performance.teamName}</TeamName>
            <DashedLine />
            <TypeIcon type={performance.type}>{performance.type}</TypeIcon>
          </PerformanceItem>
        ))}
      </PerformanceList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 42px;
  flex-direction: column;
  height: 380px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white100};
  border-radius: 12px;
  box-shadow: 2px 2px 10px #b6bcc5;
`;

const InfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.2;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.blue100};
`;

const TimetableHr = styled(TimetableHrImg)`
  margin: 11px 0;
`;

const Time = styled.p`
  ${({ theme }) => theme.typographies.subhead2};
`;

const TeamName = styled.p`
  text-align: center;
  ${({ theme }) => theme.typographies.body1};
  flex: 1;
`;

const PerformanceList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 22px;
  flex: 0.7;
`;

const PerformanceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DashedLine = styled(Dashed)`
  flex: 1;
`;

export default ClubPerformance;
