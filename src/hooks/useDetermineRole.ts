import { useLocation } from 'react-router-dom';
import { Auth } from '../types';

const useDetermineRole = (): Auth => {
  const location = useLocation();

  if (location.pathname === '/login') {
    return 'USER';
  }
  if (location.pathname === '/admin/login') {
    return 'ADMIN';
  }
  throw new Error('로그인 외 경로');
};

export default useDetermineRole;
