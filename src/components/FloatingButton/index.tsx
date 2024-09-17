import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as MenuCameraIcon } from '../../assets/imgs/menu_camera_img.svg';
import menuDefaultImg from '../../assets/imgs/menu_default_img.svg';
import { ReactComponent as MenuStampIcon } from '../../assets/imgs/menu_stamp_img.svg';

const FloatingButton = () => {
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const handleButton = () => {
    setIsButtonOpen(!isButtonOpen);
  };

  return (
    <Wrapper>
      {isButtonOpen && (
        <>
          <MenuAnimatedButton as={MenuStampIcon} />
          <MenuAnimatedButton as={MenuCameraIcon} />
        </>
      )}
      <MenuButton src={menuDefaultImg} onClick={handleButton} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 66px;
  position: absolute;
  bottom: 49px;
  right: 24px;

  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MenuButton = styled.img`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const MenuAnimatedButton = styled(MenuButton)`
  animation: ${fadeIn} 0.5s ease forwards;
  opacity: 0;
`;

export default FloatingButton;
