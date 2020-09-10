// 若对 module.exports 重新赋值就切断了原来 exports 与 module.exports 之间的联系
module.exports = 666;
module.exports = {
  a: 777
};
setTimeout(() => {
  module.exports.a = 888;
  console.log('这里是调试3');
  console.log(module.exports);
}, 1000);
console.log('这里是调试2');
console.log(module);
console.log(exports);