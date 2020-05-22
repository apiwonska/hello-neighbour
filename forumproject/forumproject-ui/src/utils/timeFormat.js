import moment from 'moment';

const mainTimeFormat = (str) => {
  // Accepts date in string format
  // If the date points to the time more than a week ago it will return date
  // Else function returns time from the date
  const day = 24 * 60 * 60 * 1000;
  const week = 7 * 24 * 60 * 60 * 1000;
  const timeDiff = Date.now() - Date.parse(str);

  if (!Date.parse(str)) return null;

  if (timeDiff > week) {
    return moment(str).format('LL');
  }
  if (timeDiff > day) {
    return moment(str).calendar();
  }
  return moment(str).startOf('second').fromNow();
};

const formatTime = {
  main: mainTimeFormat,
};

export default formatTime;
