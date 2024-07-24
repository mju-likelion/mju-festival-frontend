import styled from 'styled-components';
import LogInForm from '../components/auth/LogInForm.tsx';

const LogIn = () => {
  return (
    <Container>
      <LogInForm />
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
`;
export default LogIn;
