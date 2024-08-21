import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const DetailLostItem = () => {
  const location = useLocation();
  const { title, content, createdAt, imageUrl, isFounded } = location.state;

  return (
    <Wrapper>
      <Header />
      <ItemLayout>
        <RegisterDate>등록일 : {createdAt}</RegisterDate>
        <ItemImg src={imageUrl} />
        <ItemTitle>제목 {title}</ItemTitle>
        <ItemContent defaultValue="test 내용" value={content} />
      </ItemLayout>
      {isFounded ? <FoundP>찾았다!!!!</FoundP> : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid red;
`;

const ItemLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const RegisterDate = styled.p``;
const ItemImg = styled.img`
  width: 100%;
`;
const ItemTitle = styled.p``;
const ItemContent = styled.textarea`
  width: 100%;
  background-color: skyblue;
`;

const FoundP = styled.p`
  color: blue;
`;
export default DetailLostItem;
