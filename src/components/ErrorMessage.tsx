import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from './Header';

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Wrapper>
      <Header path="/main" />
      <ErrorWrapper>
        <ErrorContent>{children}</ErrorContent>
        <TempLayout>
          <Link to="/main">
            <MainButton>메인으로 이동하기</MainButton>
          </Link>
        </TempLayout>
      </ErrorWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

const ErrorWrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
`;

const TempLayout = styled.div`
  width: 100%;
  max-width: 240px;
`;

const ErrorContent = styled.p`
  color: ${({ theme }) => theme.colors.black50};
  ${({ theme }) => theme.typographies.callout};
`;

const MainButton = styled.button`
  width: 100%;
  border-radius: 12px;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.blue100};
  color: ${({ theme }) => theme.colors.white100};
`;

export default ErrorMessage;
