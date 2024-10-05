import styled from 'styled-components';
import { NoticeCardPropType } from '../../types';

const NoticeCard = ({ title, content, onClick }: NoticeCardPropType) => {
  return (
    <Wrapper onClick={onClick}>
      <Title>{title}</Title>
      <Contour />
      <Content>{content}</Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 124px;
  padding: 14px 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) => theme.colors.white100};
  border-radius: 12px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.blue100};
  font-size: 20px;
  font-weight: 600;
`;

const Content = styled.div`
  font-size: 17px;
  font-weight: 400;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Contour = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray200};
`;

export default NoticeCard;
