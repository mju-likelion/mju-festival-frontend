import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogInForm from './LogInForm.tsx';

const UserLogIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const onClick = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <>
      {isModalOpen && (
        <Modal>
          <p>축제 기간 이후 자동 탈퇴 알림 모달</p>
          <button type="button" onClick={() => onClick()}>
            확인
          </button>
        </Modal>
      )}
      <Wrapper>
        <LogInForm setIsModalOpen={setIsModalOpen} />
        <button type="button" onClick={() => navigate('/admin/login')}>
          관리자로 로그인하기
        </button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  border: 1px solid dodgerblue;
`;
const Modal = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid pink;
`;

export default UserLogIn;
