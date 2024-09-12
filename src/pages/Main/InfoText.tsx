import styled from 'styled-components';

interface InfoTextProps {
  children: React.ReactNode;
}
const InfoText = ({ children }: InfoTextProps) => {
  return (
    <Wrapper>
      <p>{children}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  p {
    /* display: flex; */
  }
`;

export default InfoText;
