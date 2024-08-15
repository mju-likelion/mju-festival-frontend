interface CustomError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}

export const handleError = (e: Error) => {
  const customError = e as CustomError;
  if (customError.response) {
    alert(customError.response.data.message ?? '알 수 없는 에러');
  } else {
    console.error('알 수 없는 에러', e);
  }
};
