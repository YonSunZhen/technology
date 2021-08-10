export function strToJson(str: string) {
  let jsonData = [];
  if (str === null || str === undefined || str === 'null' || str === '') {
    return jsonData;
  }
  try {
    jsonData = JSON.parse(str);
  } catch (e) {
    jsonData = [];
  }
  return jsonData;
}

export function JsonToStr(json: any) {
  try {
    return JSON.stringify(json);
  } catch (e) {
    return '';
  }
}

export function strToNumber(str: string): number {
  const strNum = parseInt(str, 10);
  if (isNaN(strNum)) {
    return null;
  }
  return strNum;
}

export function toBoolean(str: string): boolean {
  if (str === 'false' || str === '0' || str === '-0' || str === 'NaN') {
    return false;
  }
  return Boolean(str);
}

/**
 * 生成指定区间的随机整数
 * 比如生成[0,100]的闭区间随机整数，randomN(0,100)
 */
export function randomN(n: number, m: number): number {
  const random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}
