import axios from 'axios';
import { useAuthStore } from '../store';

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.message || '알 수 없는 에러';

    if (statusCode === 401) {
      alert(errorMessage);
      useAuthStore.setState({
        token: '',
        role: '',
      });
    }

    return Promise.reject(error);
  }
);

export const AxiosWeather = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_API_URL,
});
