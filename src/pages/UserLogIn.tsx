import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LogInForm from '../components/auth/LogInForm.tsx';

const UserLogIn = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <LogInForm />
      <button type="button" onClick={() => navigate('/admin/login')}>
        관리자로 로그인하기
      </button>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid dodgerblue;
`;

export default UserLogIn;
