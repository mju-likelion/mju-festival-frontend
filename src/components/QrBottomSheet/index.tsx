import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import back_close from '../../assets/imgs/sheet_back_close.png';
import back_open from '../../assets/imgs/sheet_back_open.png';
import { BoothQrData } from '../../types';
import Content from './Content';
import Header from './Header';

const BOTTOM_SHEET_HEIGHT = 310;

const BottomSheet = ({ qrCode }: BoothQrData) => {
  const sheet = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Wrapper ref={sheet} onClick={handleOpen} $isOpen={isOpen}>
      <Header isOpen={isOpen} />
      <BottomSheetContent>
        <Content qrCode={qrCode} isOpen={isOpen} />
      </BottomSheetContent>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  z-index: 1;
  bottom: -142px;
  left: 0;
  right: 0;

  padding: 0 27px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: ${BOTTOM_SHEET_HEIGHT}px;

  background-color: ${({ theme }) => theme.colors.blue100};
  background-image: ${({ $isOpen }) =>
    $isOpen ? `url(${back_open})` : `url(${back_close})`};
  background-size: cover; /* 필요에 따라 조정 */
  background-position: center; /* 필요에 따라 조정 */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition:
    transform 700ms ease-in-out,
    background-image 700ms ease-in-out;

  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(-142px)' : 'translateY(0)'};
`;

const BottomSheetContent = styled.div`
  width: 100%;
  -webkit-overflow-scrolling: touch;
`;

export default BottomSheet;
