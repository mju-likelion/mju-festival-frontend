import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer/index';

const Layout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <Wrapper>
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
      {!isLandingPage && <Footer />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Layout;
