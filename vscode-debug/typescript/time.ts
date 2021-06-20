import moment from 'moment';

export function getTime() {
  const time = moment().format('YYYYMMDD');
  return time;
}