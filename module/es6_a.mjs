let aNum = 1;
let aArr = [1];
setTimeout(() => {
  aNum = 11;
  aArr.push(11);
  console.log('1s a模块改变数据aNum&aArr:');
  console.log(`aNum=${aNum},`);
  console.log(`aArr=${aArr},`);
}, 1000)
setTimeout(() => {
  console.log(`3s a模块接受数据:aNum=,aArr=`);
}, 3000);
// 这种写法 无论什么类型 一律值引用内部变 外部也变
// export {
//   aNum,
//   aArr
// }

// 这种写法 按照传值类型来 与其他的不太一样
// 与module.exports类似
export default {
  aNum
}
console.log(`a模块已导出数据:aNum=,aArr=`);

