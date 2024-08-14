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
      <p>{notice.title}</p>
      <p>{notice.content}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ViewDetailNotice;
