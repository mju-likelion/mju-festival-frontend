import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as LandingContent } from '../../assets/imgs/landing_header_content.svg';
import { ReactComponent as LandingTitleLogo } from '../../assets/imgs/landing_title.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/landing_right_arrow.svg';
import landingBg from '../../assets/imgs/landing_Bg.webp';

const Landing = () => {
  return (
    <Wrapper>
      <Layout>
        <LandingContent />
        <LandingTitle />
        <LoginContainer>
          <StyledLink to="/login">
            <LogInBtn>로그인하러가기</LogInBtn>
          </StyledLink>
          <StyledLink to="/main">
            <MainBtn>
              로그인 없이 이용하기
              <RightArrow />
            </MainBtn>
          </StyledLink>
        </LoginContainer>
      </Layout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-image: url(${landingBg});
  background-size: cover;
  background-position: center;
  height: 100vh;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px 16px 20px;
`;

const LandingTitle = styled(LandingTitleLogo)`
  padding-top: 10px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* padding-top: 194px; */
`;

const LogInBtn = styled.button`
  width: 100%;
  max-width: 350px;
  height: 52px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.blue100};
  color: ${({ theme }) => theme.colors.white100};
`;

const MainBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 12px;
  color: ${({ theme }) => theme.colors.white100};
  ${({ theme }) => theme.typographies.footnote};
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  max-width: 350px;
  text-align: center;
  text-decoration: none;
`;
export default Landing;
