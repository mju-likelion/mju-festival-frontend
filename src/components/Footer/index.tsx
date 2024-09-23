import styled from 'styled-components';
import ContentLayout from './ContentLayout';

const Footer = () => {
  return (
    <Wrapper>
      <ContentLayout />
      <PeopleLayout>
        <PeopleContainer>
          <PeopleBox>
            <p>design</p>
            <p>김소현</p>
          </PeopleBox>
          <PeopleBox>
            <p>frontend</p>
            <p>오현의 이진혁 정혜인</p>
          </PeopleBox>
          <PeopleBox>
            <p>backend</p>
            <p>김대현</p>
          </PeopleBox>
        </PeopleContainer>
        <PeopleContainer>
          <PeopleBox>
            <p>총학생회장</p>
            <p>이승준</p>
          </PeopleBox>
          <PeopleBox>
            <p>홍보국장</p>
            <p>이우진</p>
          </PeopleBox>
          <PeopleBox>
            <p>대외협력국장</p>
            <p>이채영</p>
          </PeopleBox>
        </PeopleContainer>
      </PeopleLayout>
    </Wrapper>
  );
};
const PeopleLayout = styled.div`
  display: flex;
  padding-right: 36px;
`;
const PeopleContainer = styled.div`
  padding-top: 4px;
`;

const PeopleBox = styled.div`
  display: flex;
  width: 100%;
  width: 167px;
  height: 16px;
  gap: 4px;

  p:nth-of-type(1) {
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white100};
  }
  p:nth-of-type(2) {
    font-size: 11px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.white100};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 140px;
  background-color: ${({ theme }) => theme.colors.text900};
  padding: 14px 14px 16px 20px;
`;

export default Footer;
