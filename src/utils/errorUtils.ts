export const handleError = (e: unknown) => {
  if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error('알 수 없는 에러', e);
  }
};
