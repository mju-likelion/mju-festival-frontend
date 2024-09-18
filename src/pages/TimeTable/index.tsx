import { useState } from 'react';
import styled from 'styled-components';
import InfoText from '../../components/InfoText';
import { TimeTableInfo } from '../../types';

const TimeTable = () => {
  const [selectedDate, setSelectedDate] = useState('10월 07일');
  const timetableInfo: TimeTableInfo = {
    '10월 07일': [
      {
        type: '댄스',
        image: '/path/to/dance.jpg',
        teamName: '댄스 공연 input',
      },
      {
        type: '밴드',
        image: '/path/to/band.jpg',
        teamName: '밴드 공연 input',
      },
      {
        type: '힙합',
        image: '/path/to/hiphop.jpg',
        teamName: '힙합 공연 input',
      },
      {
        type: '축하공연',
        image: '/path/to/celebration.jpg',
        teamName: '축하공연 input',
      },
    ],
    '10월 08일': [
      {
        type: '댄스',
        image: '/path/to/dance.jpg',
        teamName: '댄스 공연 input',
      },
      {
        type: '밴드',
        image: '/path/to/band.jpg',
        teamName: '밴드 공연 input',
      },
      {
        type: '힙합',
        image: '/path/to/hiphop.jpg',
        teamName: '힙합 공연 input',
      },
      {
        type: '축하공연',
        image: '/path/to/celebration.jpg',
        teamName: '축하공연 input',
      },
    ],
  };

  return (
    <Wrapper>
      <TitleLayout>
        <p>타임테이블</p>
        <p>
          각 시간대별 공연을 확인하고
          <br />
          재미있는 공연을 즐겨보세요!
        </p>
      </TitleLayout>
      <InfoTextLayout>
        <InfoText>타임 테이블</InfoText>
      </InfoTextLayout>
      <TypeLayout>
        {timetableInfo.map((item) => (
          <TypeIcon type={item.type} key={item.teamName}>
            <p>{item.type}</p>
          </TypeIcon>
        ))}
      </TypeLayout>
      <DateLayout>
        <ButtonContainer>
          <DateButton
            onClick={() => {
              setSelectedDate('10월 07일');
            }}
          >
            <p>10월 07일</p>
          </DateButton>
          <DateButton
            onClick={() => {
              setSelectedDate('10월 08일');
            }}
          >
            <p>10월 08일</p>
          </DateButton>
        </ButtonContainer>
      </DateLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 23px 0 28px 20px;
  gap: 9px;
  border: 1px solid red;

  p:nth-of-type(1) {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text900};
  }
  p:nth-of-type(2) {
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    color: ${({ theme }) => theme.colors.text900};
  }
`;

const InfoTextLayout = styled.div`
  padding: 28px 0 31px 0;
  border: 1px solid orange;
`;

const TypeLayout = styled.div`
  display: flex;
  padding: 0 44px;
  gap: 10px;
  border: 1px solid yellow;
`;

const TypeIcon = styled.div<{ type: PerformanceType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 24px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme, type }) => {
    switch (type) {
      case '댄스':
        return '#179A8C';
      case '밴드':
        return '#5766C6';
      case '힙합':
        return '#4B82EF';
      case '축하공연':
        return '#FFB20A';
      default:
        return theme.colors.white100;
    }
  }};
`;

const DateLayout = styled.div`
  padding: 20px 30px 22px 30px;
  border: 1px solid green;
`;

const ButtonContainer = styled.div`
  display: flex;
  border-radius: 999px;
  background-color: #bfcbd2;

  p {
    /* width: 100%; */
    color: #7b858e;
    font-size: 17px;
    font-weight: 600;
  }
`;
const DateButton = styled.button`
  width: 100%;
  height: 38px;
  padding: 9px 0;
`;
export default TimeTable;
