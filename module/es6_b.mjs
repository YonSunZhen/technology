// import a from './es6_a.mjs';
// // import {aNum, aArr} from './es6_a.mjs';
// console.log(`b模块已接收数据:aNum=${a.aNum},aArr=${a.aArr}`);
// // console.log(`b模块已接收数据:aNum=${aNum},aArr=${aArr}`);
// setTimeout(() => {
//   // console.log(`2s b模块接受数据:aNum=${aNum},aArr=${aArr}`);
//   console.log(`2s b模块接受数据:aNum=${a.aNum},aArr=${a.aArr}`);
// }, 2000);

// 默认值必须排在非默认值之前
// import sum, { color } from  './es6_a.mjs';
// console.log(sum(1,2));
// console.log(color);

import { a as aa } from './es6_a.mjs';
console.log(aa(1,2));
