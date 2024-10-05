import { motion } from 'framer-motion';
import styled from 'styled-components';
import Header from '../../components/Header.tsx';

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
          <MapImg
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            src="https://image.mju-majesty.com/9adde7ca-7c5b-4627-b23e-e6aefd6a1405 "
            alt="mapImg"
          />
          <MapImg
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            src="https://image.mju-majesty.com/a54a34d0-f119-4057-8322-0aa1c4641adf"
            alt="mapImg"
          />
          <MapImg
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            src="https://image.mju-majesty.com/34265d8b-9950-41e2-8507-f57dfda87b08 "
            alt="mapImg"
          />
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

const MapImg = motion(styled.img`
  width: 100%;
`);

export default Map;
