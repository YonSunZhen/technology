// let aNum = 1;
// let aArr = [1];
// setTimeout(() => {
//   aNum = 11;
//   aArr.push(11);
//   console.log('1s a模块改变数据aNum&aArr:');
//   console.log(`aNum=${aNum}`);
//   console.log(`aArr=${aArr}`);
// }, 1000)
// // 这种写法 无论什么类型 一律值引用内部变 外部也变
// // export {
// //   aNum,
// //   aArr
// // }

// // 这种写法 按照传值类型来 与其他的不太一样
// // 与module.exports类似
// export default {
//   aNum, // 数值类型 深拷贝
//   aArr // 对象类型 浅拷贝
// }
// console.log(`a模块已导出数据:aNum=${aNum},aArr=${aArr}`);

// export let color = 'red';
// export default function(num1, num2) {
//   return num1 + num2;
// }

function sum(num1, num2) {
  return num1 + num2;
}
export { sum as a };

