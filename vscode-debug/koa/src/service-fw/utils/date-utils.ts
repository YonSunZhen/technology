import moment from 'moment';

const DATE_FORMATS = ['YYYYMMDD', 'YYYY-MM-DD', 'MM/DD/YYYY'];

/**
 * 格式：2019-01-12 19:53:01
 */
export function getNowDateString(format = 'YYYY-MM-DD HH:mm:ss') {
  return moment().format(format);
}

export function formatDate(dateStr: string, format = 'YYYY-MM-DD') {
  return moment(dateStr, DATE_FORMATS).format(format);
}

/**
 * 获取某一个月的下一个月
 * 默认返回格式: YYYYMM
 */
export function getNextMonth(dateStr: string, format = 'YYYYMM') {
  const dateFormats = ['YYYYMMDD', 'YYYY-MM-DD', 'MM/DD/YYYY'];
  return moment(dateStr, dateFormats).add('1', 'M').format(format);
}

/**
 * 获取某个月的第一天日期和最后一天日期
 */
export function getMonthStartDateAndEndDate(date: string): {
  start: string;
  end: string;
} {
  const startDate = moment(date, DATE_FORMATS).startOf('month').valueOf();
  const endDate = moment(date, DATE_FORMATS).endOf('month').valueOf();
  return {
    start: moment(startDate).format('YYYYMMDD'),
    end: moment(endDate).format('YYYYMMDD')
  };
}

/**
 * 获取某个月的第一天的号数和最后一天的号数
 */
export function getMonthStartDayAndEndDay(date: string): {
  startDay: number;
  endDay: number;
} {
  const startDate = moment(date, DATE_FORMATS).startOf('month').valueOf();
  const endDate = moment(date, DATE_FORMATS).endOf('month').valueOf();
  return {
    startDay: moment(startDate).date(),
    endDay: moment(endDate).date()
  };
}

/**
 * 获取两个日期之间的所有日期: YYYY-MM-DD
 * @param min
 * @param max
 */
export function genDateRange(min, max): Array<string> {
  const minMoment = moment(min, DATE_FORMATS);
  const maxMoment = moment(max, DATE_FORMATS);

  const minYear = minMoment.get('year');
  const maxYear = maxMoment.get('year');

  const minMonth = minMoment.get('month') + 1;
  const maxMonth = maxMoment.get('month') + 1;

  const minDate = minMoment.get('date');
  const maxDate = maxMoment.get('date');

  const result = [];
  for (let y = minYear; y <= maxYear; y++) {
    const year = y;
    const minMonthTemp = y === minYear ? minMonth : 1;
    const maxMonthTemp = y === maxYear ? maxMonth : 12;
    for (let m = minMonthTemp; m <= maxMonthTemp; m++) {
      const { startDay, endDay } = getMonthStartDayAndEndDay(`${y}${m}`);
      const minDateTemp = y === minYear && m === minMonth ? minDate : startDay;
      const maxDateTemp = y === maxYear && m === maxMonth ? maxDate : endDay;
      for (let d = minDateTemp; d <= maxDateTemp; d++) {
        const mStr = m < 10 ? `0${m}` : `${m}`;
        const dStr = d < 10 ? `0${d}` : `${d}`;
        result.push(`${year}-${mStr}-${dStr}`);
      }
    }
  }
  return result;
}

/**
 * 获取两个日期之间的所有年月: YYYYMM
 */
export function genYearMonthRange(min, max): Array<string> {
  const minMoment = moment(min, DATE_FORMATS);
  const maxMoment = moment(max, DATE_FORMATS);

  const minYear = minMoment.get('year');
  const maxYear = maxMoment.get('year');

  const minMonth = minMoment.get('month') + 1;
  const maxMonth = maxMoment.get('month') + 1;

  const result = [];
  for (let y = minYear; y <= maxYear; y++) {
    const year = y;
    const minMonthTemp = y === minYear ? minMonth : 1;
    const maxMonthTemp = y === maxYear ? maxMonth : 12;
    for (let m = minMonthTemp; m <= maxMonthTemp; m++) {
      const mStr = m < 10 ? `0${m}` : `${m}`;
      result.push(`${year}${mStr}`);
    }
  }
  return result;
}
