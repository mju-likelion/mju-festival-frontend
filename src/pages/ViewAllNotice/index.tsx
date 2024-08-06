import styled from 'styled-components';
import Header from './Header';
import NoticeCard from './NoticeCard';
import { noticeData } from '../data/noticeData';

const ViewAllNotice = () => {
  return (
    <Wrapper>
      <Header />
      {Object.keys(noticeData).map((key) => {
        const notice = noticeData[Number(key)];
        return (
          <NoticeCard key={key} title={notice.title} content={notice.content} />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ViewAllNotice;
