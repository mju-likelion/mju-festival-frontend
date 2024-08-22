import { ReactNode } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../api/Axios';
import { useAuthStore } from '../../store';

interface DeleteNoticeModalProps {
  noticeId?: string;
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const DeleteNoticeModal: React.FC<DeleteNoticeModalProps> = ({
  noticeId,
  isOpen,
  closeModal,
  children,
}) => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClick = async () => {
    try {
      await Axios.delete(`/announcements/${noticeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/view/all-notices');
    } catch (error) {
      console.error('삭제실패', error);
    }
  };

  return (
    <Wrapper $isOpen={isOpen}>
      <p>{children}</p>
      <button type="button" onClick={closeModal}>
        X
      </button>
      <DeleteButton onClick={() => handleClick()}>삭제하기</DeleteButton>
    </Wrapper>
  );
};
const Wrapper = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  background-color: pink;
  width: 100px;
  height: 100px;
`;

const DeleteButton = styled.button``;

export default DeleteNoticeModal;
