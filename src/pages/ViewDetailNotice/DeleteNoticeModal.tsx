import { ReactNode } from 'react';
import styled from 'styled-components';

interface DeleteNoticeModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const DeleteNoticeModal: React.FC<DeleteNoticeModalProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <Wrapper $isOpen={isOpen}>
      <p>{children}</p>
      <button type="button" onClick={closeModal}>
        X
      </button>
      <DeleteButton>삭제하기</DeleteButton>
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
