import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { DetailNoticeType } from '../../types';
import DeleteNoticeModal from './DeleteNoticeModal';
import { fetchNotice } from '../../api/notice.ts';

const ViewDetailNotice = () => {
  const [notice, setNotice] = useState<DetailNoticeType>({
    id: '',
    title: '',
    content: '',
    createdAt: new Date(),
    imageUrl: '',
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getNotice = useCallback(async () => {
    const response = await fetchNotice(id);
    setNotice(response);
    setImageUrl(response.imageUrl || null);
  }, [id]);

  useEffect(() => {
    getNotice();
  }, [getNotice]);

  return (
    <Wrapper>
      <Header title="공지사항">공지사항 내용</Header>
      <p>
        {`등록일 : ${notice.createdAt
          .toString()
          .split('T')[0]
          .replace(/-/gi, ' . ')}`}
      </p>
      {imageUrl && <img src={imageUrl} width="400px" alt="사진" />}
      <div>
        <span>제목 : </span>
        <Title>{notice.title}</Title>
      </div>
      <Content>{notice.content}</Content>
      <UpdateButton onClick={() => navigate(`/notice/${id}/edit`)}>
        수정하기
      </UpdateButton>
      <DeleteButton onClick={openModal}>삭제하기</DeleteButton>
      <DeleteNoticeModal
        noticeId={id}
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        삭제시 복구 불가
      </DeleteNoticeModal>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.span`
  font-weight: bold;
`;

const Content = styled.p`
  background-color: #eff0f6;
  max-width: 330px;
  height: 220px;
  padding: 18px 15px;
  line-height: 22px;
`;

const UpdateButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue100};
  border-radius: 28px;
  color: white;
  width: 174px;
  height: 42px;
`;

const DeleteButton = styled.button`
  background-color: #80878d;
  border-radius: 28px;
  color: white;
  width: 174px;
  height: 42px;
`;

export default ViewDetailNotice;
