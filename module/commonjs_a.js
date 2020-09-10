const b = require("./common_b");
console.log('这里是调试1');
console.log(b);
setTimeout(() => {
  console.log('这里是调试4');
  console.log(b);
}, 4000)