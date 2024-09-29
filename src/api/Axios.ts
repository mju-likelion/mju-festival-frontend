import axios from 'axios';
import { useAuthStore, useErrorStore } from '../store';
import { ERRORS } from '../types';

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

Axios.interceptors.response.use(
  (response) => {
    const { setErrorMessage } = useErrorStore.getState();
    setErrorMessage(null);
    return response;
  },
  (error) => {
    const { setErrorMessage } = useErrorStore.getState();
    if (ERRORS.has(error.response.data.errorCode)) {
      useAuthStore.setState({
        token: '',
        role: '',
      });
      setErrorMessage('로그인이 유효하지 않습니다. 다시 로그인해주세요');
    }
    return Promise.reject(error);
  }
);

export const AxiosWeather = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_API_URL,
});
