import styled from 'styled-components';

interface LogInButtonProps {
  $isActive: boolean;
}

const LogInButton = ({ $isActive }: LogInButtonProps) => {
  return (
    <Button type="submit" $isActive={$isActive}>
      로그인
    </Button>
  );
};

const Button = styled.button<{ $isActive: boolean }>`
  width: 100%;
  margin-top: 32px;
  padding: 16px 0;
  border-radius: 12px;
  ${({ theme }) => theme.typographies.body1};
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.blue100 : theme.colors.gray500};
`;
export default LogInButton;
