import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deleteLostItem } from '../../api/lostItem';
import { useAuthStore } from '../../store';
import Header from './Header';

const DetailLostItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, role } = useAuthStore();
  const { title, content, createdAt, imageUrl, isFounded } = location.state;

  const handleDelete = async () => {
    if (window.confirm('정말로 이 아이템을 삭제하시겠습니까?')) {
      try {
        if (id && token) {
          await deleteLostItem(id, token);
          navigate('/lost-items');
        } else {
          console.error('삭제를 위한 ID나 토큰이 없습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Wrapper>
      <Header />
      <ItemLayout>
        <RegisterDate>등록일 : {createdAt}</RegisterDate>
        <ItemImg src={imageUrl} />
        <ItemTitle>제목 {title}</ItemTitle>
        <ItemContent>내용 {content}</ItemContent>
      </ItemLayout>
      {isFounded ? <FoundP>찾았다!!!!</FoundP> : null}
      {role === 'STUDENT_COUNCIL' && (
        <>
          <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
          <EditButton
            onClick={() =>
              navigate(`/lost-items/${id}/edit`, { state: location.state })
            }
          >
            수정하기
          </EditButton>
        </>
      )}
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
const ItemContent = styled.p`
  width: 100%;
  background-color: skyblue;
`;

const FoundP = styled.p`
  color: blue;
`;

const DeleteButton = styled.button``;
const EditButton = styled.button``;

export default DetailLostItem;
