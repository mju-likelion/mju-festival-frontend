import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { getBoothDetail, getQrData } from '../../api/booth.ts';
import BottomSheet from '../../components/QrBottomSheet/index.tsx';
import { BoothDetailInfo } from '../../types';
import { useAuthStore } from '../../store';

const BoothDetail = () => {
  const [qrCode, setQrCode] = useState('');

  const { role, token } = useAuthStore();
  const [boothDetailData, setBoothDetailData] = useState<BoothDetailInfo>({
    createdAt: '',
    description: '',
    id: '',
    imageUrl: '',
    location: '',
    locationImageUrl: '',
    name: '',
  });
  const { name, description, location, imageUrl, locationImageUrl, createdAt } =
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

  const fetchQr = async () => {
    if (!params.boothId) {
      return;
    }
    const data = await getQrData(params.boothId, token);
    if (data) {
      setQrCode(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (role === 'BOOTH_MANAGER') {
      fetchQr();
    }
  }, []);

  return (
    <Wrapper>
      <button type="button" onClick={() => navigate('/booths')}>
        뒤로가기
      </button>
      <h1>{role}</h1>
      <Box>
        <p>부스 이름: {name}</p>
        <p>부스 설명: {description}</p>
        <p>위치: {location}</p>
        <p>생성 시간: {createdAt}</p>
        <Img src={imageUrl} alt="부스 이미지" />
        <Img src={locationImageUrl} alt="부스 위치 이미지" />
      </Box>
      {role === 'STUDENT' && (
        <StudentAction>
          <Buttons>
            <Button>QR 촬영하기</Button>
            <Button>도장판으로</Button>
          </Buttons>
        </StudentAction>
      )}
      {role === 'BOOTH_MANAGER' && (
        <StudentAction>
          <Buttons>
            <Button
              onClick={() =>
                navigate(`/booth/edit/${params.boothId}`, {
                  state: { ...boothDetailData },
                })
              }
            >
              수정하기
            </Button>
          </Buttons>
        </StudentAction>
      )}
      {role === 'BOOTH_MANAGER' && <BottomSheet qrCode={qrCode} />}
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
const Buttons = styled.button`
  display: flex;
  gap: 20px;
`;
const Button = styled.button``;

export default BoothDetail;
