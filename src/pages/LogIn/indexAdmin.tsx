import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LogInForm from './LogInForm.tsx';

const AdminLogIn = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <button type="button" onClick={() => navigate('/login')}>
        뒤로가기
      </button>
      <LogInForm />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid black;
`;

export default AdminLogIn;
