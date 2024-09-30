import styled from 'styled-components';
import { ReactComponent as TimetableHr } from '../../assets/imgs/timetable_hr.svg';

interface UnivPerformanceProps {
  title: string;
  time: string;
}
const UnivPerformance = ({ title, time }: UnivPerformanceProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <TimetableHr />
      <Time>{time}</Time>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 0;
  gap: 11px;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white100};
  border-radius: 12px;
  box-shadow: 2px 2px 10px #b6bcc5;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.blue100};
`;

const Time = styled.p`
  ${({ theme }) => theme.typographies.subhead2};
`;
export default UnivPerformance;
