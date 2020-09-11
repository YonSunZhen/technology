// 若对 module.exports 重新赋值就切断了原来 exports 与 module.exports 之间的联系
let aNum = 1;
let aArr = [1];
let aObj = {
  name: 1
}
setTimeout(() => {
  aNum = 11; // 并不会影响module.exports.aNum的值
  aArr.push(11); // 会影响module.exports.aArr的值
  aObj.name = 11;
  console.log('1s a模块改变数据aNum&aArr&aObj:');
  console.log(`aNum=${aNum},module.exports.aNum=${module.exports.aNum}`);
  console.log(`aArr=${aArr},module.exports.aArr=${module.exports.aArr}`);
}, 1000)
setTimeout(() => {
  console.log(`3s a模块接受数据:aNum=${module.exports.aNum},aArr=${module.exports.aArr}`);
}, 3000)
// 以下写法等价于
// module.exports.aNum = aNum aNum属于基本类型 值拷贝
// module.exports.aArr = aArr aArr属于对象 值引用
module.exports = {
  aNum,
  aArr,
  aObj
};
console.log(`a模块已导出数据:aNum=${module.exports.aNum},aArr=${module.exports.aArr}`);
