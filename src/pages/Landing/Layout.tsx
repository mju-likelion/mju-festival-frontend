import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/index';

const Layout = () => {
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  return (
    <>
      <Outlet />
      {!isLandingPage && <Footer />}
    </>
  );
};

export default Layout;
