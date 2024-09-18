import styled from 'styled-components';
import DetailInfo from './DetailInfo';
import { useTimeTableData } from '../../context/TimeTable';
import { useTimeTableDateStore } from '../../store/timetable';

const DetailInfoList = () => {
  const { timetableInfo } = useTimeTableData();
  const { selectedDate } = useTimeTableDateStore();

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
  border: 1px solid blue;
`;

const Contour = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 24px;
  background-color: #b0bdf7;
`;

export default DetailInfoList;
