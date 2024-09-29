import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Error } from '../../assets/icons/big_error.svg';

const Index = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Error />
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
      <Button type="button" onClick={() => navigate('/main')}>
        메인페이지로 이동하기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white100};
`;

const Title = styled.div`
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.typographies.largeTitle};
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.typographies.title1};
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 10px;
  p {
    color: ${({ theme }) => theme.colors.black100};
    ${({ theme }) => theme.typographies.body2};
    text-align: center;
  }
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.typographies.title1};
`;

const Button = styled.button`
  width: 100%;
  border-radius: 12px;
  padding: 16px 11px;
  margin-top: 50px;
  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
`;
export default Index;
