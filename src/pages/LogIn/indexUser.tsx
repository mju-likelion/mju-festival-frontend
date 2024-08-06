import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LogInForm from './LogInForm.tsx';

const UserLogIn = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <LogInForm />
      <button type="button" onClick={() => navigate('/admin/login')}>
        관리자로 로그인하기
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid dodgerblue;
`;

export default UserLogIn;
