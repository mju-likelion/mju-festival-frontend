import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { getBoothDetail } from '../../api/booth.ts';
import { BoothDetailInfo } from '../../types';

const BoothDetail = () => {
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
      <Box>
        <p>id: {id}</p>
        <p>부스 이름: {name}</p>
        <p>부스 설명: {description}</p>
        <p>위치: {location}</p>
        <p>생성 시간: {createdAt}</p>
        <Img src={imageUrl} alt="부스 이미지" />
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid dodgerblue;
`;
const Box = styled.div`
  border: 1px solid pink;
`;
const Img = styled.img`
  width: 300px;
`;
export default BoothDetail;
