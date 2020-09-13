import a from './es6_a.mjs';
// import {aNum, aArr} from './es6_a.mjs';
console.log(`b模块已接收数据:aNum=${a.aNum},aArr=${a.aArr}`);
// console.log(`b模块已接收数据:aNum=${aNum},aArr=${aArr}`);
setTimeout(() => {
  // console.log(`2s b模块接受数据:aNum=${aNum},aArr=${aArr}`);
  console.log(`2s b模块接受数据:aNum=${a.aNum},aArr=${a.aArr}`);
}, 2000);