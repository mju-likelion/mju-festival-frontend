import styled from 'styled-components';
import { TimeTableDetailInfo } from '../../types';
import TypeIcon from './TypeIcon';

interface DetailInfoProps {
  info: TimeTableDetailInfo;
}

const DetailInfo = ({ info }: DetailInfoProps) => {
  return (
    <Wrapper>
      <TimeLayout>
        <p>{info.time}</p>
      </TimeLayout>
      <InfoLayout>
        <InfoContainer>
          <TextBox>
            <p>{info.teamName}</p>
            <TypeIcon type={info.type}>{info.type}</TypeIcon>
          </TextBox>
          <InfoImg src={info.image} alt={info.teamName} />
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
  position: relative;
  z-index: 20;
  border: 1px solid skyblue;
`;

const TimeLayout = styled.div`
  p {
    font-size: 17px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue100};
    white-space: nowrap;
  }
`;

const InfoLayout = styled.div`
  height: 124px;
  padding: 12px 11px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white100};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border: 2px solid blue;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 4px;
  border: 1px solid pink;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid red;

  p:first-child {
    font-size: 20px;
    font-weight: 600;
  }
`;

const InfoImg = styled.img`
  height: auto;
  max-width: 104px;
`;

export default DetailInfo;
