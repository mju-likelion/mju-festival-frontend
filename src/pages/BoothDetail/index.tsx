import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBoothDetail, getOwnership, getQrData } from '../../api/booth.ts';

import { ReactComponent as LocationIcon } from '../../assets/icons/location_icon.svg';
import Header from '../../components/Header.tsx';
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
    department: '',
    id: '',
    imageUrl: '',
    location: '',
    locationImageUrl: '',
    name: '',
  });
  const {
    name,
    department,
    description,
    location,
    imageUrl,
    locationImageUrl,
    createdAt,
  } = boothDetailData;

  const params = useParams();
  const navigate = useNavigate();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  }

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
        console.error(e);
      }
    };
    initializeData();

    // const timer = setInterval(() => {
    //   if (isOwner) {
    //     fetchQr();
    //     console.log('리프레시');
    //   }
    // }, 60000);

    // return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Wrapper $isOwner={isOwner}>
        <Header />
        <Box>
          <Title>부스정보</Title>
          <Department>{department}</Department>
          <CreateAt>등록일: {formatDate(createdAt)}</CreateAt>

          <BoothImg src={imageUrl} alt="부스 이미지" />
          <Name>제목: {name}</Name>
          <Description>내용: {description}</Description>
          <LocationBox>
            <Location>부스위치:</Location>
            <LocationIcon />
            <Location>{location}</Location>
          </LocationBox>
          <MapImg src={locationImageUrl} alt="부스 위치 이미지" />
        </Box>
        {role === 'STUDENT' && (
          <StudentAction>
            <Buttons>
              <QRButton onClick={() => navigate(`/`)}>QR 촬영하기</QRButton>
              <StampButton onClick={() => navigate(`/`)}>
                도장판으로
              </StampButton>
            </Buttons>
          </StudentAction>
        )}
        {isOwner && (
          <>
            <AdminAction>
              <Buttons>
                <QRButton
                  onClick={() =>
                    navigate(`/booths/${params.boothId}/edit`, {
                      state: { ...boothDetailData },
                    })
                  }
                >
                  수정하기
                </QRButton>
              </Buttons>
            </AdminAction>
            <BottomSheet
              qrCode={qrCode}
              department={department}
              fetchQr={fetchQr}
            />
          </>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ $isOwner: boolean }>`
  margin-bottom: ${({ $isOwner }) => $isOwner && `250px`};
`;
const Box = styled.div`
  padding: 0 20px;
`;
const Title = styled.p`
  margin: 10px 0;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.title1};
`;
const Department = styled.p`
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.callout};
`;
const Name = styled.p`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.title1};
`;
const Description = styled.p`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
`;
const LocationBox = styled.div`
  height: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;
const Location = styled.p`
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
`;
const CreateAt = styled.p`
  text-align: end;
  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.typographies.caption1};
`;
const BoothImg = styled.img`
  width: 350px;
  height: 248px;
  margin-bottom: 16px;
  border-radius: 12px;
  object-fit: cover;
`;
const MapImg = styled.img`
  width: 350px;
  height: 182px;
  margin-bottom: 40px;
  border-radius: 12px;
  object-fit: cover;
`;
const AdminAction = styled.div`
  padding: 0 20px;
`;
const StudentAction = styled.div`
  padding: 0 20px;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const QRButton = styled.button`
  width: 100%;
  padding: 16px 0;
  border-radius: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white100};
  background-color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.typographies.body1};
`;
const StampButton = styled.button`
  width: 100%;
  padding: 16px 0;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.blue100};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.blue100};
  background-color: ${({ theme }) => theme.colors.white100};
  ${({ theme }) => theme.typographies.body1};
`;

export default BoothDetail;
