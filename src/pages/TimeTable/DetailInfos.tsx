import styled from 'styled-components';
import { TimeTableInfo } from '../../types';
import DetailInfo from './DetailInfo';

interface DetailInfoProps {
  timetableInfo: TimeTableInfo;
}
const DetailInfos = ({ timetableInfo }: DetailInfoProps) => {
  return (
    <Wrapper>
      <DetailInfo />
      <DetailInfo />
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

export default DetailInfos;
