import styled from 'styled-components';
import ContentLayout from './ContentLayout';

const Footer = () => {
  return (
    <Wrapper>
      <ContentLayout />
      <PeopleLayout>
        <PeopleContainer>
          <PeopleBox>
            <Position>design</Position>
            <Name>김소현</Name>
          </PeopleBox>
          <PeopleBox>
            <Position>frontend</Position>
            <Name>오현의 이진혁 정혜인</Name>
          </PeopleBox>
          <PeopleBox>
            <Position>backend</Position>
            <Name>김대현</Name>
          </PeopleBox>
        </PeopleContainer>
        <PeopleContainer>
          <PeopleBox>
            <Position>총학생회장</Position>
            <Name>이승준</Name>
          </PeopleBox>
          <PeopleBox>
            <Position>홍보국장</Position>
            <Name>이우진</Name>
          </PeopleBox>
          <PeopleBox>
            <Position>대외협력국장</Position>
            <Name>이채영</Name>
          </PeopleBox>
        </PeopleContainer>
      </PeopleLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 140px;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.text900};
`;
const PeopleLayout = styled.div`
  display: flex;
  gap: 30px;
`;
const PeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const PeopleBox = styled.div`
  display: flex;
  gap: 4px;
`;
const Position = styled.p`
  ${({ theme }) => theme.typographies.caption1};
  color: ${({ theme }) => theme.colors.white100};
`;
const Name = styled.p`
  ${({ theme }) => theme.typographies.caption2};
  color: ${({ theme }) => theme.colors.white100};
`;

export default Footer;
