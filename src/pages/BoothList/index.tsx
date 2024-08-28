import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoothList } from '../../api/booth.ts';
import { BoothInfo } from '../../types';

const BoothPage = () => {
  const [boothListData, setBoothListData] = useState<BoothInfo[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getBoothList();
    setBoothListData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper>
      <button type="button" onClick={() => navigate('/')}>
        뒤로가기
      </button>
      {boothListData.map((booth) => (
        <BoothBox key={booth.id} onClick={() => navigate(`/booths/${booth.id}`)}>
          <p>id: {booth.id}</p>
          <p>부스 이름: {booth.name}</p>
          <p>부스 설명: {booth.description}</p>
          <Img src={booth.imageUrl} alt="부스 이미지" />
        </BoothBox>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid dodgerblue;
`;
const BoothBox = styled.div`
  border: 1px solid pink;
`;
const Img = styled.img`
  width: 300px;
`;
export default BoothPage;
