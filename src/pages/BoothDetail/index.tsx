import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBoothDetail, getOwnership, getQrData } from '../../api/booth.ts';

import { ReactComponent as LocationIcon } from '../../assets/icons/location_icon.svg';
import Header from '../../components/Header.tsx';
import BottomSheet from '../../components/QrBottomSheet/index.tsx';
import { useAuthStore } from '../../store';
import { BoothDetailInfo } from '../../types';

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
    isEventBooth: false,
  });
  const {
    name,
    department,
    description,
    location,
    imageUrl,
    locationImageUrl,
    createdAt,
    isEventBooth,
  } = boothDetailData;

  const params = useParams();
  const navigate = useNavigate();

  const fetchOwnership = async () => {
    if (!params.boothId) {
      return false;
    }
    return getOwnership(token, params.boothId);
  };

  const fetchQr = async () => {
    if (!params.boothId) {
      return;
    }
    const data = await getQrData(token, params.boothId);
    if (data) {
      setQrCode(data);
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
      await fetchBoothDetailData();
      if (role === 'BOOTH_MANAGER') {
        const isOwner = await fetchOwnership();
        setIsOwner(isOwner);
      }
    };
    initializeData();
  }, []);

  const date = createdAt.split(' ')[0];

  return (
    <>
      <Wrapper $isOwner={isOwner}>
        <Header path="/booths" />
        <Box>
          <Title>부스정보</Title>
          <Department>{department}</Department>
          <CreateAt>등록일: {date}</CreateAt>

          <BoothImg src={imageUrl} alt="부스 이미지" />
          <Name>{name}</Name>
          <Description>{description}</Description>
          <LocationBox>
            <LocationTitle>부스위치:</LocationTitle>
            <StyledLocationIcon />
            <Location>{location}</Location>
          </LocationBox>
          <MapImg src={locationImageUrl} alt="부스 위치 이미지" />
        </Box>
        {role === 'STUDENT' && (
          <StudentAction>
            <Buttons>
              {isEventBooth && (
                <QRButton onClick={() => navigate(`/qr-reader`)}>
                  QR 촬영하기
                </QRButton>
              )}
              <StampButton onClick={() => navigate(`/stamps`)}>
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
            {isEventBooth && (
              <BottomSheet
                qrCode={qrCode}
                department={department}
                fetchQr={fetchQr}
              />
            )}
          </>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ $isOwner: boolean }>`
  padding-bottom: ${({ $isOwner }) => ($isOwner ? `150px` : `40px`)};
  background-color: ${({ theme }) => theme.colors.white100};
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
  overflow-wrap: break-word;
  white-space: normal;
`;
const Description = styled.p`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
  line-height: 22px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;
const LocationBox = styled.div`
  height: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;
const LocationTitle = styled.p`
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
  white-space: nowrap;
`;
const StyledLocationIcon = styled(LocationIcon)`
  flex-shrink: 0;
`;
const Location = styled.p`
  width: 100%;
  color: ${({ theme }) => theme.colors.text900};
  ${({ theme }) => theme.typographies.body2};
  overflow-wrap: break-word;
  white-space: normal;
`;
const CreateAt = styled.p`
  margin-bottom: 10px;
  text-align: end;
  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.typographies.caption1};
`;
const BoothImg = styled.img`
  width: 100%;
  margin-bottom: 16px;
  border-radius: 12px;
  object-fit: cover;
`;
const MapImg = styled.img`
  width: 100%;
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
