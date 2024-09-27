import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const Index = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header path="/main" />
      <Wrapper>
        <Text>404 NotFound</Text>
        <Button type="button" onClick={() => navigate('/main')}>
          메인페이지로 이동하기
        </Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue100};
`;
const Text = styled.div`
  color: ${({ theme }) => theme.colors.white100};
  ${({ theme }) => theme.typographies.largeTitle};
`;
const Button = styled.button`
  padding: 10px 20px;
  border: 2px solid ${({ theme }) => theme.colors.white100};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.white100};
  ${({ theme }) => theme.typographies.body1};
`;
export default Index;
