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
  padding: 43px 95px 32px 95px;

  p {
    display: inline-block;
    text-align: center;
    padding-bottom: 6px;
    width: 200px;
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue100};
    border-bottom: 1px solid ${({ theme }) => theme.colors.blue400};
  }
`;

export default InfoText;
