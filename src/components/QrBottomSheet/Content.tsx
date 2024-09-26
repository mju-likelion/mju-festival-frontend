import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import styled from 'styled-components';
import { ReactComponent as Refresh } from '../../assets/icons/qr_refresh.svg';
import { ReactComponent as SmallQrImg } from '../../assets/imgs/sheet_small_qr.svg';
import { BottomSheetPropTypes } from '../../types';

const INITIAL_SECONDS = 60;

const Content = ({
  qrCode,
  isOpen,
  department,
  fetchQr,
}: BottomSheetPropTypes) => {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  const handleRefreshClick = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    setSeconds(INITIAL_SECONDS);
    fetchQr();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        // 타이머가 0이 되었을 때
        fetchQr();
        return INITIAL_SECONDS; // 다시 초기화
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchQr]);

  const formatTime = (seconds: number) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  return (
    <Wrapper $isOpen={isOpen}>
      <TopSection>
        <TextLayout
          as={motion.div}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>QR 촬영하기</Title>
          <SubTitle>
            {isOpen ? (
              `${department} QR 이미지`
            ) : (
              <>
                부스 QR 이미지를 카메라에 맞춰
                <br />
                보여주시면 됩니다.
              </>
            )}
          </SubTitle>
        </TextLayout>

        {isOpen ? (
          <RefreshContainer>
            <RefreshText>{formatTime(seconds)}</RefreshText>
            <Refresh onClick={handleRefreshClick} />
          </RefreshContainer>
        ) : (
          <SmallQrImg />
        )}
      </TopSection>

      {isOpen && (
        <QrLayout
          as={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {qrCode && <QRCode value={qrCode} size={132} />}
        </QrLayout>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TextLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.white100};
`;

const SubTitle = styled.p`
  ${({ theme }) => theme.typographies.subhead2};
  color: ${({ theme }) => theme.colors.white100};
  line-height: 1.5;
`;

const RefreshContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 3px;
  gap: 4px;
`;

const RefreshText = styled.p`
  ${({ theme }) => theme.typographies.callout};
  color: ${({ theme }) => theme.colors.white100};
`;

const QrLayout = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 39px;
  background-color: ${({ theme }) => theme.colors.white100};
  padding: 10px;
`;

export default Content;
