import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import styled from 'styled-components';
import { BottomSheetPropTypes } from '../../types';

const Content = ({ qrCode, isOpen }: BottomSheetPropTypes) => {
  return (
    <Wrapper isOpen={isOpen}>
      <TextLayout
        as={motion.div}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -10 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Title>QR 촬영하기</Title>
        <SubTitle>
          부스 QR 이미지를 카메라에 맞춰
          <br />
          보여주시면 됩니다.
        </SubTitle>
      </TextLayout>
      <QrLayout
        as={motion.div}
        initial={{ height: '44px', width: '44px' }}
        animate={{
          height: isOpen ? '142px' : '44px',
          width: isOpen ? '142px' : '44px',
        }}
        transition={{ duration: 1.5 }}
      >
        {qrCode && <QRCode value={qrCode} size={isOpen ? 132 : 34} />}
      </QrLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: ${({ isOpen }) => (isOpen ? 'column' : 'row')};
  justify-content: ${({ isOpen }) => (isOpen ? 'center' : 'space-between')};
  align-items: center;
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
`;

const QrLayout = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.white100};
`;

export default Content;
