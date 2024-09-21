import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBoothDetail, getOwnership, getQrData } from '../../api/booth.ts';

import BottomSheet from '../../components/QrBottomSheet/index.tsx';
import { useAuthStore } from '../../store';
import { BoothDetailInfo } from '../../types';
import { handleError } from '../../utils/errorUtil.ts';

import { ReactComponent as BackIcon } from '../../assets/icons/left_arrow.svg';
import { ReactComponent as LocationIcon } from '../../assets/icons/location_icon.svg';

const BoothDetail = () => {
  const { role, token } = useAuthStore();

  const [isOwner, setIsOwner] = useState(true);
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
          // setIsOwner(isOwner);
          setIsOwner(true);
          if (isOwner) {
            await fetchQr();
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    initializeData();
  }, []);

  return (
    <Wrapper $isOwner={isOwner}>
      <BackButton role="button" onClick={() => navigate('/login')}>
        <BackIcon />
        뒤로가기
      </BackButton>
      {role === 'BOOTH_MANAGER' && <RoleLabel>관리자용</RoleLabel>}
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
            <StampButton onClick={() => navigate(`/`)}>도장판으로</StampButton>
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
          <BottomSheet qrCode={qrCode} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isOwner: boolean }>`
  margin-bottom: ${({ $isOwner }) => $isOwner && `250px`};
`;
const BackButton = styled.div`
  padding: 4px 10px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.footnote};
`;
const RoleLabel = styled.p`
  margin-right: 50px;
  text-align: end;
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typographies.subhead2};
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
const AdminAction = styled.div``;
const StudentAction = styled.div`
  padding: 0 20px;
`;
const Buttons = styled.button`
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
