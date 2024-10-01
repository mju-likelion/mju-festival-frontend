import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Error from '../../assets/icons/big_error.svg';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Img src={Error} />
      <Title>404</Title>
      <SubTitle>Not Found</SubTitle>
      <ContentLayout>
        <Content>페이지를 찾을 수 없습니다</Content>
        <p>
          페이지가 존재하지 않거나
          <br />
          사용할 수 없는 페이지입니다
        </p>
      </ContentLayout>
      <Button type="button" onClick={() => navigate('/')}>
        메인페이지로 이동하기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 100px 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const Title = styled.div`
  margin-top: 30px;
  color: #002968;
  font-size: 34px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  color: #002968;
  font-size: 20px;
  font-weight: 600;
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 10px;
  p {
    color: #000000;
    font-size: 17px;
    font-weight: 400;
    text-align: center;
  }
`;

const Content = styled.div`
  color: #002968;
  font-size: 20px;
  font-weight: 600;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 12px;
  padding: 16px 11px;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 17px;
  font-weight: 600;
  color: #ffffff;
  background-color: #002968;
`;

const Img = styled.img``;

export default NotFound;
