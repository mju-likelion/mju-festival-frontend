import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as MenuCameraIcon } from '../../assets/imgs/menu_camera.svg';
import menuDefault from '../../assets/imgs/menu_default.svg';
import { ReactComponent as MenuStampIcon } from '../../assets/imgs/menu_stamp.svg';
import { useAuthStore } from '../../store';

const FloatingButton = () => {
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const navigate = useNavigate();
  const { role, token } = useAuthStore();

  const handleButton = () => {
    setIsButtonOpen(!isButtonOpen);
  };

  const handleNavigate = (path: string) => {
    if (token && role === 'STUDENT') {
      navigate(path);
    } else {
      alert('해당 페이지는 학생 로그인 후 이용 가능합니다.');
    }
  };

  return (
    <Wrapper>
      {isButtonOpen && (
        <>
          <MenuAnimatedButton
            as={MenuStampIcon}
            onClick={() => handleNavigate('/stamps')}
          />
          <MenuAnimatedButton
            as={MenuCameraIcon}
            onClick={() => handleNavigate('/qr-reader')}
          />
        </>
      )}
      <MenuButton src={menuDefault} onClick={handleButton} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 66px;
  position: fixed;
  bottom: 49px;
  right: 24px;

  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 50;
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
