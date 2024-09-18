import styled from 'styled-components';
import { TimeTableInfo } from '../../types';

interface DetailInfoProps {
  timetableInfo: TimeTableInfo;
}
const DetailInfos = ({ timetableInfo }: DetailInfoProps) => {
  return <Wrapper />;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 51px 24px;
  background-color: #f0f5f7;
`;

export default DetailInfos;
