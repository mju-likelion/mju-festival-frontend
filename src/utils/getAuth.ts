import { useLocation } from 'react-router-dom';

const GetAuth = () => {
  const location = useLocation();

  if (location.pathname === '/login') {
    return 'user';
  }
  if (location.pathname === '/admin/login') {
    return 'admin';
  }
  throw new Error('로그인 외 경로');
};

export default GetAuth;
