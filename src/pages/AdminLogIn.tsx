import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LogInForm from '../components/auth/LogInForm.tsx';

const AdminLogIn = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <button type="button" onClick={() => navigate('/login')}>
        뒤로가기
      </button>
      <LogInForm />
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
`;

export default AdminLogIn;
