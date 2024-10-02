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

    if (statusCode === 401) {
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
