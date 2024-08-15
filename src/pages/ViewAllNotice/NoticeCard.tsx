import styled from 'styled-components';
import { NoticeCardPropTypes } from '../../types';

const NoticeCard: React.FC<NoticeCardPropTypes> = ({
  title,
  content,
  onClick,
}) => {
  return (
    <Wrapper onClick={onClick}>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: wheat;
  padding: 18px 20px 27px 20px;
  border-radius: 14px;
  margin: 4px 0;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Content = styled.div`
  height: 34px;
  width: 290px;
  line-height: 17px;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export default NoticeCard;
