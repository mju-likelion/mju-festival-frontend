import styled from 'styled-components';
import { ReactComponent as Dashed } from '../../assets/imgs/timetable_dashed.svg';

interface InfoTitleProps {
  children: React.ReactNode;
}
const InfoTitle = ({ children }: InfoTitleProps) => {
  return (
    <Wrapper>
      <DashedLine />
      <Title>{children}</Title>
      <DashedLine />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
`;
const Title = styled.p`
  text-align: center;
  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.blue100};
`;
const DashedLine = styled(Dashed)``;

export default InfoTitle;
