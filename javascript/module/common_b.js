const a = require("./commonjs_a");
console.log(`b模块已接收数据:aNum=${a.aNum},aArr=${a.aArr},aObj=${a.aObj.name}`);
setTimeout(() => {
  console.log(`2s b模块接受数据:aNum=${a.aNum},aArr=${a.aArr},aObj=${a.aObj.name}`);
  a.aNum = 2;
  a.aArr = [2]
  console.log(`2s b模块改变数据:aNum=${a.aNum},aArr=${a.aArr}`);
}, 2000)
