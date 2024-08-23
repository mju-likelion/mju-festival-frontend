import styled from 'styled-components';
import BottomSheet from '.';

const Base = () => {
  return (
    <>
      <BaseDiv />
      <BottomSheet />
    </>
  );
};

const BaseDiv = styled.div`
  width: 100%;
  /* height: calc(var(--vh, 1vh) * 100); */
  height: 100vh;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Base;
