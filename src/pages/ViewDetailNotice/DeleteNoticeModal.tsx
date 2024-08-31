import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../api/Axios';
import { useAuthStore } from '../../store';
import { DeleteNoticeModalProps } from '../../types';

const DeleteNoticeModal = ({
  noticeId,
  isOpen,
  closeModal,
  children,
}: DeleteNoticeModalProps) => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDeleteClick = async () => {
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
      <DeleteButton onClick={() => handleDeleteClick()}>삭제하기</DeleteButton>
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
