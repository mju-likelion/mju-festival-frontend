import styled from 'styled-components';

const Map = () => {
  return (
    <Wrapper>
      <TitleLayout>
        <p>지도</p>
        <p>각 부스 및 행사장 위치를 파악하고 즐기세요!</p>
      </TitleLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const TitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 6px 20px 56px 20px;

  p:nth-of-type(1) {
    font-size: 20px;
    font-weight: 600;
  }
  p:nth-of-type(2) {
    font-size: 16px;
    font-weight: 400;
  }
`;

export default Map;
