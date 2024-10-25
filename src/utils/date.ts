import { format } from 'date-fns';

const formattedDateTime = new Intl.DateTimeFormat('vi-VN', {
  weekday: 'long', // Full weekday name, e.g., "Thứ hai"
  year: 'numeric', // Numeric year, e.g., "2024"
  month: 'long', // Full month name, e.g., "Tháng Mười"
  day: 'numeric', // Day of the month
  hour: 'numeric', // Hour in 24-hour format
  minute: 'numeric', // Minutes
  second: 'numeric', // Seconds
  hour12: false, // Use 24-hour time format
});

export function convertToDate(date: Date | string | number) {
  try {
    // return format(date, "dd/MM/yyyy");
    return new Date(date).toLocaleDateString();
  } catch (err) {
    console.log({ err, date });
  }
}
export function convertToDateType2(date: Date | string | number) {
  try {
    console.log(format(date, 'yyyy-MM-dd'));
    return format(date, 'yyyy-MM-dd');
  } catch (err) {
    console.log({ err, date });
  }
}
export function convertHoursToDate(
  hours: string | number,
  inputDate = new Date()
) {
  const date = new Date(inputDate);
  if (typeof hours === 'number') {
    date.setHours(hours);
    return date;
  }
  const splits = hours.split(':');
  const [hour, minute, ...second] = splits;
  date.setHours(
    parseInt(hour),
    parseInt(minute),
    typeof second === 'number' ? parseInt(second) : 0
  );
  return date;
}

export const formatViDate = (date: Date) => {
  return formattedDateTime.format(date);
};
