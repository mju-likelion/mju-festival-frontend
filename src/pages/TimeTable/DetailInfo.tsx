import styled from 'styled-components';
import { TimeTableDetailInfo } from '../../types';
import TypeIcon from './TypeIcon';

interface DetailInfoProps {
  info: TimeTableDetailInfo;
}

const DetailInfo = ({ info }: DetailInfoProps) => {
  return (
    <Wrapper>
      <p>{info.time}</p>
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

  p {
    font-size: 17px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue100};
    flex-shrink: 0;
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
  gap: 4px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid red;
`;

const InfoImg = styled.img`
  width: auto;
  max-width: 100%;
  height: auto;
`;

export default DetailInfo;
