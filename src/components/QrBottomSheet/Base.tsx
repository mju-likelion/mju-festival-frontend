import styled from 'styled-components';
import BottomSheet from '.';

const Base = () => {
  return (
    <BaseDiv>
      <BottomSheet />
    </BaseDiv>
  );
};

const BaseDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid blue;
`;

export default Base;
