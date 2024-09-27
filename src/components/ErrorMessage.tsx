import styled from 'styled-components';

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Wrapper>
      <TempLayout>
        <ErrorContent>{children}</ErrorContent>
      </TempLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  padding: 0 30px;
  margin: 42px 0 3px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TempLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ErrorContent = styled.p`
  color: ${({ theme }) => theme.colors.black50};
  ${({ theme }) => theme.typographies.callout};
`;

export default ErrorMessage;
