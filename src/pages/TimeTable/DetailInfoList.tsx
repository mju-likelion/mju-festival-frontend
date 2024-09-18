import styled from 'styled-components';
import DetailInfo from './DetailInfo';

const DetailInfoList = () => {
  return (
    <Wrapper>
      <DetailInfo />
      <Contour />
      <DetailInfo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;
  padding: 51px 24px;
  background-color: #f0f5f7;
  border: 1px solid blue;
`;

const Contour = styled.div`
  width: 100%;
  height: 1px;
  background-color: #b0bdf7;
`;

export default DetailInfoList;
