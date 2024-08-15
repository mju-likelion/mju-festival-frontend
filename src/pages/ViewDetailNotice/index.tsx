import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { Axios } from '../../api/Axios';
import { DetailNoticeType } from '../../types';

const ViewDetailNotice = () => {
  const [notice, setNotice] = useState<DetailNoticeType>({
    id: '',
    title: '',
    content: '',
    createdAt: new Date(),
    imageUrl: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const { id } = useParams();

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
      <img src={imageUrl} alt="사진" />
      <div>
        <span>제목 : </span>
        <Title>{notice.title}</Title>
      </div>
      <Content>{notice.content}</Content>
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

export default ViewDetailNotice;
