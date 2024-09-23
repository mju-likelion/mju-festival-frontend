import styled from 'styled-components';
import DetailInfo from './DetailInfo';
import { useTimeTableData } from '../../context/TimeTable';
import { TimeTableDate } from '../../types';

interface DetailInfoListProps {
  selectedDate: TimeTableDate;
}
const DetailInfoList = ({ selectedDate }: DetailInfoListProps) => {
  const { timetableInfo } = useTimeTableData();

  const selectedTimetable = timetableInfo[selectedDate] || [];

  return (
    <Wrapper>
      {selectedTimetable.map((info, index) => (
        <div key={info.teamName}>
          <DetailInfo info={info} />
          {index < selectedTimetable.length - 1 && <Contour />}
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;
  padding: 51px 24px;
  background-color: #f0f5f7;
`;

const Contour = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 24px;
  background-color: #b0bdf7;
`;

export default DetailInfoList;
