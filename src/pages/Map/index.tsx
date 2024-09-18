import styled from 'styled-components';
import mapImg from '../../assets/imgs/MapImg.png';

const Map = () => {
  return (
    <Wrapper>
      <TitleLayout>
        <p>지도</p>
        <p>각 부스 및 행사장 위치를 파악하고 즐기세요!</p>
      </TitleLayout>
      <MapImgLayout>
        <MapImg src={mapImg} alt="mapImg" />
      </MapImgLayout>
      <IconsLayout />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 20px 88px 20px;
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  border: 1px solid red;

  p:nth-of-type(1) {
    font-size: 20px;
    font-weight: 600;
  }
  p:nth-of-type(2) {
    font-size: 16px;
    font-weight: 400;
  }
`;
const MapImgLayout = styled.div`
  padding-top: 56px;
  border: 1px solid red;
`;

const MapImg = styled.img`
  width: 100%;
  height: 478px;
`;

const IconsLayout = styled.div`
  padding-top: 48px;
  border: 1px solid pink;
`;

export default Map;
