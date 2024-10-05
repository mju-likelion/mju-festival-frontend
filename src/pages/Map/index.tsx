import styled from 'styled-components';
import Header from '../../components/Header.tsx';
import map1 from '../../assets/imgs/map1.webp';
import map2 from '../../assets/imgs/map2_1.webp';
import map3 from '../../assets/imgs/map3_1.webp';

const Map = () => {
  return (
    <>
      <Header path="/main" />
      <Wrapper>
        <TitleLayout>
          <p>지도</p>
          <p>각 부스 및 행사장 위치를 파악하고 즐기세요!</p>
        </TitleLayout>
        <MapImgLayout>
          <MapImg src={map1} alt="mapImg" />
          <MapImg src={map2} alt="mapImg" />
          <MapImg src={map3} alt="mapImg" />
        </MapImgLayout>
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 30px;
`;

const MapImg = styled.img`
  width: 100%;
`;

export default Map;
