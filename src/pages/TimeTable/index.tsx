import { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header.tsx';
import InfoText from '../../components/InfoText';
import { TimeTableDate } from '../../types';
import UnivPerformance from './UnivPerformance.tsx';
import ClubPerformance from './ClubPerformance.tsx';
import InfoTitle from './InfoTitle.tsx';
import CelebrityPerformance from './CelebrityPerformance.tsx';

const TimeTable = () => {
  const [selectedDate, setSelectedDate] = useState<TimeTableDate>('10월 07일');

  return (
    <Wrapper>
      <Header path="/main" />
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
      <DateLayout>
        <ButtonContainer>
          <FirstDateButton
            onClick={() => {
              setSelectedDate('10월 07일');
            }}
            $isSelected={selectedDate === '10월 07일'}
          >
            <p>10월 07일</p>
          </FirstDateButton>
          <SecondDateButton
            onClick={() => {
              setSelectedDate('10월 08일');
            }}
            $isSelected={selectedDate === '10월 08일'}
          >
            <p>10월 08일</p>
          </SecondDateButton>
        </ButtonContainer>
      </DateLayout>
      <ContextLayout>
        {selectedDate === '10월 07일' && (
          <>
            <UniversityContainer>
              <InfoTitle>학교 내부 공연</InfoTitle>
              <UnivPerformance title="백마 체전 시상식" time="18:20 ~ 18:30" />
              <ClubPerformance date="10월 07일" time="18:40 ~ 20:20" />
            </UniversityContainer>
            <CelebrityContainer>
              <InfoTitle>연예인 공연</InfoTitle>
              <CelebrityPerformance date="10월 07일" />
            </CelebrityContainer>
          </>
        )}
        {selectedDate === '10월 08일' && (
          <>
            <UniversityContainer>
              <InfoTitle>학교 내부 공연</InfoTitle>
              <UnivPerformance
                title="명지대 응원단 연합"
                time="18:05 ~ 18:25"
              />
              <ClubPerformance date="10월 08일" time="18:25 ~ 19:10" />
              <UnivPerformance title="유끼즈" time="19:10 ~ 19:50" />
            </UniversityContainer>
            <CelebrityContainer>
              <InfoTitle>연예인 공연</InfoTitle>
              <CelebrityPerformance date="10월 08일" />
            </CelebrityContainer>
          </>
        )}
      </ContextLayout>
      <FooterLayout />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white100};
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 23px 0 28px 20px;
  gap: 9px;

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
`;

const DateLayout = styled.div`
  padding: 20px 30px 22px 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  border-radius: 999px;
  background-color: #bfcbd2;

  p {
    color: #7b858e;
    font-size: 17px;
    font-weight: 600;
  }
`;
const FirstDateButton = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  height: 38px;
  padding: 9px 0;
  border-radius: 999px;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.blue100 : 'transparent'};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  p {
    color: ${({ theme, $isSelected }) => $isSelected && theme.colors.white100};
    transition: color 0.3s ease;
  }
`;
const SecondDateButton = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  height: 38px;
  padding: 9px 0;
  border-radius: 999px;
  background-color: transparent;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.blue100 : 'transparent'};

  p {
    color: ${({ theme, $isSelected }) => $isSelected && theme.colors.white100};
    transition: color 0.3s ease;
  }
`;

const ContextLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const UniversityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 34px 20px 0 20px;
`;

const CelebrityContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px 32px 20px;
  gap: 34px;
`;

const FooterLayout = styled.div`
  width: 100%;
  height: 88px;
  background-color: transparent;
`;
export default TimeTable;
