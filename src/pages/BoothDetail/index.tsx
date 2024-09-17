import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBoothDetail, getOwnership, getQrData } from '../../api/booth.ts';

import BottomSheet from '../../components/QrBottomSheet/index.tsx';
import { useAuthStore } from '../../store';
import { BoothDetailInfo } from '../../types';
import { handleError } from '../../utils/errorUtil.ts';

const BoothDetail = () => {
  const { role, token } = useAuthStore();

  const [isOwner, setIsOwner] = useState(false);
  const [qrCode, setQrCode] = useState('');
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

  const fetchOwnership = async () => {
    if (!params.boothId) {
      return false;
    }
    return getOwnership(token, params.boothId);
  };

  const fetchQr = async () => {
    try {
      if (!params.boothId) {
        return;
      }
      const data = await getQrData(token, params.boothId);
      if (data) {
        setQrCode(data);
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  const fetchBoothDetailData = async () => {
    if (!params.boothId) {
      return;
    }
    const response = await getBoothDetail(params.boothId);
    setBoothDetailData(response);
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchBoothDetailData();
        if (role === 'BOOTH_MANAGER') {
          const isOwner = await fetchOwnership();
          setIsOwner(isOwner);
          if (isOwner) {
            await fetchQr();
          }
        }
      } catch (e) {
        handleError(e as Error);
      }
    };
    initializeData();
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
      {isOwner && (
        <>
          <StudentAction>
            <Buttons>
              <Button
                onClick={() =>
                  navigate(`/booths/${params.boothId}/edit`, {
                    state: { ...boothDetailData },
                  })
                }
              >
                수정하기
              </Button>
            </Buttons>
          </StudentAction>
          <BottomSheet qrCode={qrCode} />
        </>
      )}
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
