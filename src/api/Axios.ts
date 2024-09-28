import axios from 'axios';
import { useAuthStore } from '../store';
import { ERRORS } from '../types/errorCode';

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

Axios.interceptors.response.use(undefined, (res) => {
  if (ERRORS.has(res.data.errorCode)) {
    useAuthStore.setState({
      token: '',
      role: '',
    });
    // 메시지는 zustand로 관리해서 해당 컴포넌트에서 사용해서 띄울 예정
  }
  return res;
});

export const AxiosWeather = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_API_URL,
});
