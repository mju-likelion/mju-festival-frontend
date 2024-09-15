import styled from 'styled-components';

const LogInButton = () => {
  return <Button type="submit">로그인</Button>;
};

const Button = styled.button`
  width: 100%;
  margin-top: 32px;
  padding: 16px 0;
  border-radius: 12px;
  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
`;
export default LogInButton;
