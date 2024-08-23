import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BOTTOM_SHEET_HEIGHT } from './BottomSheetOption';
import useBottomSheet from '../../hooks/useBottomSheet';
import Header from './Header';
import Content from './Content';

const BottomSheet = () => {
  const { sheet, handleClick } = useBottomSheet();

  return (
    <Wrapper ref={sheet} onClick={handleClick}>
      <Header />
      <BottomSheetContent>
        <Content />
      </BottomSheetContent>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  z-index: 1;
  top: calc(100% - 90px);
  left: 0;
  right: 0;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: ${BOTTOM_SHEET_HEIGHT}px;

  background: linear-gradient(
    359.26deg,
    #3c41c7 0.02%,
    #3742b2 83.23%,
    #3642ae 98.76%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: transform 700ms ease-in-out;
`;

const BottomSheetContent = styled.div`
  /* overflow: auto; */
  -webkit-overflow-scrolling: touch;
`;
export default BottomSheet;
