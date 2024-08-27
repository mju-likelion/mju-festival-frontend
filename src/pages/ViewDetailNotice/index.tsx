import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { Axios } from '../../api/Axios';
import { DetailNoticeType } from '../../types';
import DeleteNoticeModal from './DeleteNoticeModal';

const ViewDetailNotice = () => {
  const [notice, setNotice] = useState<DetailNoticeType>({
    id: '',
    title: '',
    content: '',
    createdAt: new Date(),
    imageUrl: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchNotice = async (id: string | undefined) => {
    const response = await Axios.get(`/announcements/${id}`);
    return response.data;
  };

  const getNotice = useCallback(async () => {
    const response = await fetchNotice(id);
    setNotice(response);
    setImageUrl(response.imageUrl);
  }, [id]);

  useEffect(() => {
    getNotice();
  }, [getNotice]);

  return (
    <Wrapper>
      <Header />
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
