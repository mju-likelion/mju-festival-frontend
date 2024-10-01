import styled from 'styled-components';
import { CelebrityInfo, TimeTableDate } from '../../types';
import tencm from '../../assets/team_imgs/10cm.png';
import carthegarden from '../../assets/team_imgs/carthegarden.png';
import yena from '../../assets/team_imgs/yena.png';
import changmo from '../../assets/team_imgs/changmo.png';
import heize from '../../assets/team_imgs/heize.png';
import punch from '../../assets/team_imgs/punch.png';

interface CelebrityInfoProps {
  date: TimeTableDate;
}

const CelebrityPerformData: CelebrityInfo = {
  '10월 07일': [
    {
      name: '10센치',
      img: tencm,
    },
    {
      name: '최예나',
      img: yena,
    },
    {
      name: '카더가든',
      img: carthegarden,
    },
  ],
  '10월 08일': [
    {
      name: '창모',
      img: changmo,
    },
    {
      name: '헤이즈',
      img: heize,
    },
    {
      name: '펀치',
      img: punch,
    },
  ],
};

const CelebrityPerformance = ({ date }: CelebrityInfoProps) => {
  const performances = CelebrityPerformData[date] || [];

  return (
    <Wrapper>
      {performances.map((performance) => (
        <InformLayout key={performance.name}>
          <TextContainer>
            <Name>{performance.name}</Name>
            <Badege>연예인</Badege>
          </TextContainer>
          <CelebrityImg src={performance.img} alt={performance.name} />
        </InformLayout>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const InformLayout = styled.div`
  display: flex;
  justify-content: space-between;
  height: 124px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white100};
  border-radius: 12px;
  box-shadow: 2px 2px 10px #b6bcc5;
  padding: 12px 13px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Name = styled.div`
  display: flex;
  align-items: center;
  height: 66px;
  width: 100%;
  padding-left: 4px;
  white-space: nowrap;
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.blue100};
`;

const Badege = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 68px;
  border-radius: 999px;
  background: var(
    --gradient-01,
    linear-gradient(262deg, #6ea4fd -4.27%, #9747ff 152.88%)
  );
  color: ${({ theme }) => theme.colors.white100};
  ${({ theme }) => theme.typographies.caption1};
`;

const CelebrityImg = styled.img`
  border-radius: 8px;
`;

export default CelebrityPerformance;
