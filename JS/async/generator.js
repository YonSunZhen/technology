// 生成器
// 一种返回迭代器的函数
// 新关键字yield => 表示暂停
// yield 后面的值表示要传递给下一个过程的值
// 过程: 每当执行完一条yield语句后函数就暂停了,直到再次调用函数的next()方法才会继续执行后面的语句。
// 使用yield关键字可以返回任何值或表达式
// 注意: 1、yield关键字只能在生成器函数的直接内部使用(在生成器函数内部的函数中使用会报错);
// 2、不能用箭头函数来创建生成器

function *createInterator() {
  yield 1;
  yield 2;
  yield 3;
}
// 生成器的调用方式与普通函数相同,只不过返回一个迭代器
let iterator = createInterator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
