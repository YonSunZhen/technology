import a from './es6_a.mjs';
// import {aNum, aArr} from './es6_a.mjs';
console.log(`b模块已接收数据:aNum=${a.aNum},aArr=${a.aArr}`);
// console.log(`b模块已接收数据:aNum=${aNum},aArr=${aArr}`);
setTimeout(() => {
  // console.log(`2s b模块接受数据:aNum=${aNum},aArr=${aArr}`);
  // aNum = 2;
  // aArr = [2]
  // console.log(`2s b模块改变数据:aNum=${aNum},aArr=${aArr}`);
  console.log(`2s b模块接受数据:aNum=${a.aNum},aArr=${a.aArr}`);
  a.aNum = 2;
  a.aArr = [2]
  console.log(`2s b模块改变数据:aNum=${a.aNum},aArr=${a.aArr}`);
}, 2000);