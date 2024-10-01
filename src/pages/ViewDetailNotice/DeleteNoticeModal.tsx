import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Axios } from '../../api/Axios';
import { useAuthStore } from '../../store';
import { DeleteNoticeModalProps } from '../../types';
import { ReactComponent as CloseBtnIcon } from '../../assets/icons/close.svg';
import LoadingSpinner from '../../components/LoadingSpinner';

const DeleteNoticeModal = ({
  noticeId,
  isOpen,
  closeModal,
}: DeleteNoticeModalProps) => {
  const { role, token } = useAuthStore();
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDeleteClick = async () => {
    if (!token || role !== 'STUDENT_COUNCIL') {
      setError('게시물 삭제 권한이 없습니다.');
      return;
    }

    setIsLoading(true);

    try {
      await Axios.delete(`/announcements/${noticeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/view/all-notices');
    } catch (error) {
      setError('게시물 삭제 권한이 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <Wrapper $isOpen={isOpen}>
      <ModalLayout>
        {error ? (
          <DeleteContainer>
            <ContentBox>
              <p>{error}</p>
            </ContentBox>
            <Link to="/main">
              <ErrorBtn>메인으로 이동하기</ErrorBtn>
            </Link>
          </DeleteContainer>
        ) : (
          <>
            <CloseBtn onClick={closeModal} />
            <TextContainer>
              <Title>삭제하기 전 유의사항</Title>
              <Content>
                게시물 삭제 후 게시물
                <br />
                복구가 되지 않습니다.
                <br />
                <br />
                확인하신 후 삭제해주시길 바랍니다
              </Content>
            </TextContainer>
            <DeleteButton onClick={handleDeleteClick}>확인하기</DeleteButton>
          </>
        )}
      </ModalLayout>
    </Wrapper>
  );
};
const Wrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black30};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalLayout = styled.div`
  position: relative;
  max-width: 330px;
  width: calc(100vw - 60px);
  height: 238px;
  padding: 28px 38px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white100};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Title = styled.p`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
`;

const Content = styled.p`
  width: 100%;
  font-size: 17px;
  font-weight: 400;
`;

const CloseBtn = styled(CloseBtnIcon)`
  position: absolute;
  top: 14px;
  left: 14px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  width: 100%;
  max-width: 180px;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.blue100};
  color: ${({ theme }) => theme.colors.white100};
  border-radius: 12px;
`;

const DeleteContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white100};
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  p {
    color: ${({ theme }) => theme.colors.black50};
    ${({ theme }) => theme.typographies.callout};
  }
`;

const ErrorBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 12px;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.blue100};
  color: ${({ theme }) => theme.colors.white100};
  margin-top: 20px;
`;
export default DeleteNoticeModal;
