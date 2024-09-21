import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { DetailNoticeType } from '../../types';
import DeleteNoticeModal from './DeleteNoticeModal';
import { fetchNotice } from '../../api/notice.ts';
import { useAuthStore } from '../../store/auth.ts';
import { openInstagram } from '../../utils/openInstaUtil.ts';
import { ReactComponent as InstaArrowIconImg } from '../../assets/icons/backIcon.svg';
import NoImage from './NoImage.tsx';

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
  const { role } = useAuthStore();

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
      <DateLayout>
        <p>
          {`등록일 : ${notice.createdAt
            .toString()
            .split('T')[0]
            .replace(/-/gi, ' . ')}`}
        </p>
      </DateLayout>
      <ImageLayout>
        {imageUrl ? <img src={imageUrl} alt="사진" /> : <NoImage />}
      </ImageLayout>

      <ContentLayout>
        <TitleContainer>
          <p>제목 : </p>
          <Title>{notice.title}</Title>
        </TitleContainer>
        <ContentContainer>
          <p>내용 :</p>
          <Content>{notice.content}</Content>
        </ContentContainer>
      </ContentLayout>
      <InstagramBtnLayout onClick={openInstagram}>
        <p>총학생회 인스타그램</p>
        <InstaArrowIcon />
      </InstagramBtnLayout>
      {role === 'STUDENT_COUNCIL' && (
        <ButtonLayout>
          <UpdateButton onClick={() => navigate(`/notice/${id}/edit`)}>
            수정하기
          </UpdateButton>
          <DeleteButton onClick={openModal}>삭제하기</DeleteButton>
        </ButtonLayout>
      )}
      <DeleteNoticeModal
        noticeId={id}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const DateLayout = styled.div`
  display: flex;
  justify-content: end;
  padding: 6px 20px 6px 0;

  p {
    font-size: 11px;
    font-weight: 600;
    color: #939da6;
  }
`;

const ImageLayout = styled.div`
  display: flex;
  width: 100%;
  height: 248px;
  padding: 0 20px;

  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    /* object-fit: contain; */
  }
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 17px 20px 41px 20px;
`;

const TitleContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text900};
`;

const Title = styled.div`
  width: 100%;
  height: auto;
  font-size: 20px;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text900};
`;

const Content = styled.div`
  width: 100%;
  height: 145px;
  font-size: 17px;
  font-weight: 400;
  white-space: pre-wrap;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cdcccc;
    border-radius: 12px;
  }
`;

const InstagramBtnLayout = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 12px 44px 0;

  p {
    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text500};
  }
`;

const InstaArrowIcon = styled(InstaArrowIconImg)`
  width: 24px;
  height: 24px;
  transform: scaleX(-1);
`;

const ButtonLayout = styled.div`
  display: flex;
  padding: 0 20px 88px 20px;
  gap: 6px;

  button {
    width: 100%;
    height: 42px;
    border-radius: 12px;
    font-size: 17px;
    font-weight: 600;
  }
`;

const UpdateButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue100};
  color: ${({ theme }) => theme.colors.white100};
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.blue100};
  color: ${({ theme }) => theme.colors.blue100};
`;

export default ViewDetailNotice;
