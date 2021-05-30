const moment = require('moment');

function getTime() {
  const test = 1;
  const a = new Object();
  return moment().format('YYYYMMDD');
}

module.exports = {
  getTime
}