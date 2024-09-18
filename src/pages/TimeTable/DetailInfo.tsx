import styled from 'styled-components';

const DetailInfo = () => {
  return (
    <Wrapper>
      <p>18 : 00</p>
      <InfoLayout />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  height: 124px;
  border: 1px solid skyblue;

  p {
    white-space: nowrap;
    font-size: 17px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue100};
  }
`;

const InfoLayout = styled.div`
  width: 100%;
  height: 124px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white100};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

export default DetailInfo;
