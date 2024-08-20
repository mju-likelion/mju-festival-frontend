import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { getBoothDetail } from '../../api/booth.ts';
import { BoothDetailInfo } from '../../types';
import { useAuthStore } from '../../store';

const BoothDetail = () => {
  const { role } = useAuthStore();
  const [boothDetailData, setBoothDetailData] = useState<BoothDetailInfo>({
    createdAt: '',
    description: '',
    id: '',
    imageUrl: '',
    location: '',
    name: '',
  });
  const { id, name, description, location, imageUrl, createdAt } =
    boothDetailData;
  const params = useParams();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    if (!params.boothId) {
      return;
    }
    const response = await getBoothDetail(params.boothId);
    setBoothDetailData(response);
  }, [params.boothId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Wrapper>
      <button type="button" onClick={() => navigate('/booths')}>
        뒤로가기
      </button>
      <h1>{role}</h1>
      <Box>
        <p>id: {id}</p>
        <p>부스 이름: {name}</p>
        <p>부스 설명: {description}</p>
        <p>위치: {location}</p>
        <p>생성 시간: {createdAt}</p>
        <Img src={imageUrl} alt="부스 이미지" />
      </Box>
      {role === 'STUDENT' && (
        <StudentAction>
          <Buttons>
            <Button>QR 촬영하기</Button>
            <Button>도장판으로</Button>
          </Buttons>
        </StudentAction>
      )}
      {role === 'BOOTH_MANAGER' && <BoothManagerAction>QR</BoothManagerAction>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid dodgerblue;
`;
const Box = styled.div`
  border: 3px solid #ff8f4c;
`;
const Img = styled.img`
  width: 300px;
`;
const StudentAction = styled.div`
  border: 3px solid pink;
`;
const BoothManagerAction = styled.div`
  border: 3px solid lightgreen;
`;
const Buttons = styled.button`
  display: flex;
  gap: 20px;
`;
const Button = styled.button``;

export default BoothDetail;
