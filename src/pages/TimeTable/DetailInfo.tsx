import styled from 'styled-components';
import { useTimeTableData } from '../../context/TimeTable';
import { useTimeTableDateStore } from '../../store/timetable';
import TypeIcon from './TypeIcon';

const DetailInfo = () => {
  const { performanceTypeData, timetableInfo } = useTimeTableData();
  const { selectedDate } = useTimeTableDateStore();

  return (
    <Wrapper>
      <p>18 : 00</p>
      <InfoLayout>
        <InfoContainer>
          <TextBox>
            <p>{timetableInfo[selectedDate]?.[0].teamName}</p>
            <TypeIcon type={timetableInfo[selectedDate]?.[0].type}>
              {timetableInfo[selectedDate]?.[0].type}
            </TypeIcon>
          </TextBox>
        </InfoContainer>
      </InfoLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  height: 124px;
  border: 1px solid skyblue;

  p {
    white-space: nowrap;
    font-size: 17px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue100};
  }
`;

const InfoLayout = styled.div`
  width: 100%;
  height: 124px;
  padding: 12px 11px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white100};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoImg = styled.img``;

export default DetailInfo;
