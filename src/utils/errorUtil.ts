interface CustomError extends Error {
  response?: {
    data: {
      message: string;
      errorCode: number;
    };
  };
}

export const handleError = (e: Error) => {
  const customError = e as CustomError;
  const loginRedirectErrorCodes = [40103, 40104, 40105];
  if (customError.response) {
    if (loginRedirectErrorCodes.includes(customError.response.data.errorCode)) {
      alert('로그인 정보가 만료되었습니다. 다시 로그인 해주세요.');
      window.location.href = '/login';
    }
    alert(customError.response.data.message ?? '알 수 없는 에러');
  } else {
    console.error('알 수 없는 에러', e);
  }
};
