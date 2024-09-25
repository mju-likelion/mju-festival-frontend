import styled from 'styled-components';
import Header from '../../components/Header';
import InfoText from '../../components/InfoText';
import Board from './Board';

const Stamp = () => {
  return (
    <Wrapper>
      <Header path={-1} />
      <TitleLayout>
        <Title>도장판</Title>
        <SubTitle>
          부스에서 도장을 찍고 도장을 모두 모아
          <br />
          응모권을 모아보세요! 사은품의 주인공이 되어 보세요!
        </SubTitle>
      </TitleLayout>
      <InfoText>도장판</InfoText>
      <Board />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  position: relative;
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 23px 33px 29px 20px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.text900};
`;

const SubTitle = styled.p`
  ${({ theme }) => theme.typographies.callout};
  color: ${({ theme }) => theme.colors.text900};
  margin-top: 9px;
`;

export default Stamp;
