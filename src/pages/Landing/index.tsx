import styled from 'styled-components';
import landingBg from '../../assets/imgs/landing_Bg.webp';

const Landing = () => {
  return (
    <Wrapper>
      <LogInBtn>로그인하러가기</LogInBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-image: url(${landingBg});
  background-size: cover;
  background-position: center;
  height: 100vh;
`;

const LogInBtn = styled.button``;

export default Landing;
