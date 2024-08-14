import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
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
  const [noticeId, setNoticeId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchNotice = async (noticeId: string) => {
    const response = await Axios.get(`/announcements/${noticeId}`);
    return response.data;
  };

  const getNotice = useCallback(async () => {
    const response = await fetchNotice(noticeId);
    setNotice(response);
    setNoticeId(response.id);
    setImageUrl(response.imageUrl);
  }, [noticeId]);

  useEffect(() => {
    getNotice();
  }, [getNotice]);

  return (
    <Wrapper>
      <Header />
      <p>{notice.createdAt.toString()}</p>
      <img src={imageUrl} alt="사진" />
      <p>{notice.title}</p>
      <p>{notice.content}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ViewDetailNotice;
