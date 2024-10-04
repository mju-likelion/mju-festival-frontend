import { DateFormat } from './format/DateFormat';

export const formatDate = (
  date: Date,
  DateFormatClass: new (date: Date) => DateFormat
): string => {
  const timeFormat = new DateFormatClass(date);
  return timeFormat.formatDate();
};

export const getCurrentDate = (
  DateFormatClass: new (date: Date) => DateFormat
): string => {
  return formatDate(new Date(), DateFormatClass);
};
