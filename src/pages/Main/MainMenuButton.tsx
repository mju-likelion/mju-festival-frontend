import styled from 'styled-components';
import mapBgImg from '../../assets/imgs/mapBtnBgImg.webp';
import boothBgImg from '../../assets/imgs/boothBtnBgImg.webp';
import timetableBgImg from '../../assets/imgs/timetableBtnBgImg.webp';
import noticeBgImg from '../../assets/imgs/noticeBtnBgImg.webp';
import lostitemBgImg from '../../assets/imgs/lostitemBtnBgImg.webp';
import { MainButtonBgImg, ButtonProps } from '../../types';

const MainMenuButton = ({ bgimg, type, onClick, children }: ButtonProps) => {
  const setBackgroundImage = (bgimg: MainButtonBgImg) => {
    switch (bgimg) {
      case 'map':
        return mapBgImg;
      case 'booth':
        return boothBgImg;
      case 'timetable':
        return timetableBgImg;
      case 'notice':
        return noticeBgImg;
      case 'lostItem':
        return lostitemBgImg;
      default:
        return '';
    }
  };

  return (
    <Wrapper>
      <Button type={type} onClick={onClick} $bgimg={setBackgroundImage(bgimg)}>
        <p>{children}</p>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Button = styled.button<{ $bgimg: string }>`
  position: absolute;
  width: 100%;
  height: 80px;
  border-radius: 999px;
  background-image: url(${(props) => props.$bgimg});
  background-size: cover;
  background-position: center;
  bottom: 0;
  z-index: 10;

  p {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white100};
  }
`;

export default MainMenuButton;
