export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `등록일 : ${year} . ${month} . ${day}`;
};

export const getCurrentDate = (): string => {
  return formatDate(new Date());
};
