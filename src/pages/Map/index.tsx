import styled from 'styled-components';
import { ReactComponent as BoothIcon } from '../../assets/icons/map_booth_icon.svg';
import { ReactComponent as EventIcon } from '../../assets/icons/map_event_icon.svg';
import { ReactComponent as FoodTruckIcon } from '../../assets/icons/map_foodtruck_icon.svg';
import { ReactComponent as MicIcon } from '../../assets/icons/map_mic_icon.svg';
import mapImg from '../../assets/imgs/MapImg.png';
import Header from '../../components/Header.tsx';

const Map = () => {
  const iconsData = [
    { Icon: BoothIcon, name: '부스' },
    { Icon: FoodTruckIcon, name: '푸드트럭' },
    { Icon: EventIcon, name: '이벤트' },
    { Icon: MicIcon, name: '마이크' },
  ];

  return (
    <>
      <Header path="/main" />
      <Wrapper>
        <TitleLayout>
          <p>지도</p>
          <p>각 부스 및 행사장 위치를 파악하고 즐기세요!</p>
        </TitleLayout>
        <MapImgLayout>
          <MapImg src={mapImg} alt="mapImg" />
        </MapImgLayout>
        <IconsLayout>
          {iconsData.map((item) => (
            <IconContainer key={item.name}>
              <item.Icon />
              <p>{item.name}</p>
            </IconContainer>
          ))}
        </IconsLayout>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 20px 88px 20px;
  background-color: ${({ theme }) => theme.colors.white100};
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  p:nth-of-type(1) {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text900};
  }
  p:nth-of-type(2) {
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text900};
  }
`;
const MapImgLayout = styled.div`
  padding-top: 56px;
`;

const MapImg = styled.img`
  width: 100%;
  height: 478px;
`;

const IconsLayout = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 49px 0 88px 0;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  p {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text900};
  }
`;

export default Map;
