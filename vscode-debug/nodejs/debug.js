const moment = require('./moment');
const path = require('path');

function test() {
  const a = moment.getTime();
  const test = path.format({});
  return a;
}

test();