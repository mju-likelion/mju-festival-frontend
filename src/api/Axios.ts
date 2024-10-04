import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../store';

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface CustomError extends Error {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
}

const isUnauthorizedError = (error: CustomError) => {
  return error.response?.status === 401;
};

const handleUnauthorizedError = (error: CustomError) => {
  useAuthStore.setState({
    token: '',
    role: '',
  });
  alert(
    `인증 정보가 올바르지 않습니다. 다시 로그인해주세요\n${error.response?.data.message}`
  );
  window.location.href = '/login';
};

const isServerError = (error: CustomError) => {
  if (error.response) {
    const statusCode: number = error.response.status;

    return statusCode / 100 === 5;
  }
};

const handleError = (error: CustomError) => {
  alert(error.response?.data.message ?? '알 수 없는 에러');
};

const handleExpectedError = (error: CustomError) => {
  if (isUnauthorizedError(error)) {
    handleUnauthorizedError(error);
    return;
  }
  if (isServerError(error)) {
    alert('서버에서 에러가 발생했습니다.');
    return;
  }
  handleError(error);
};

const handleUnexpectedError = (e: AxiosError) => {
  alert(`알 수 없는 에러가 발생했습니다.\n${e}`);
};

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const customError = error as CustomError;

    if (customError.response) {
      handleExpectedError(customError);
      return;
    }

    handleUnexpectedError(error);

    return Promise.reject(error);
  }
);

export const AxiosWeather = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_API_URL,
});
