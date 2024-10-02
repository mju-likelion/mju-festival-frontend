import { useState } from 'react';
import axios from 'axios';
import { ERROR_CODES, ErrorCode } from '../types';

// 로그인 관련 에러 확인 후 아닌 경우엔 지정한 error message를 띄웁니다
export const useAxiosErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);

  const handleAxiosError = (errorMessage: string, e?: unknown) => {
    if (axios.isAxiosError(e)) {
      const errorCode: ErrorCode = e.response?.data?.errorCode;
      if (errorCode && Object.values(ERROR_CODES).includes(errorCode)) {
        setError(
          '로그인이 유효하지 않습니다. 로그아웃 이후 다시 로그인해주세요'
        );
      }
    } else {
      setError(errorMessage);
    }
  };

  return { error, handleAxiosError };
};
