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
  console.log('这里是调试1');
  yield 2;
  yield 3;
}
// 生成器的调用方式与普通函数相同,只不过返回一个迭代器
let iterator = createInterator();
console.log(iterator.next()); // { value: 1, done: false }
setTimeout(() => {
  console.log(iterator.throw());
}, 2000)
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 输入和输出-迭代消息传递 
function *foo(x) {
  const y = x * (yield);
  return y;
}
const it = foo(6);
// 启动生成器一定要用不带参数的next(...)
it.next(); // 第一个next(...)总是启动一个生成器 并运行到第一个yield处 不可省略 next(...)里面的参数会被忽略
const res = it.next(7); // next(...)的数量总是比yield的多一个
console.log(res); // 42

// 输入和输出-消息是双向传递的
function *foo(x) {
  const y = x * (yield "Hello");
  return y;
}
const it = foo(6);
let res = it.next();
console.log(res.value); // Hello
res = it.next(7);
console.log(res.value); // 42

// 多个迭代器
function *foo() {
  const x = yield 2;
  z++;
  const y = yield(x * z);
  console.log(x, y, z);
}
var z = 1;
const it1 = foo();
const it2 = foo();
let val1 = it1.next().value; // 2
let val2 = it2.next().value; // 2
val1 = it1.next(val2 * 10).value; // 40 这里得到第二个yield发出的值 x*z=20*2
val2 = it2.next(val1 * 5).value; // 600 这里得到第二个yield发出的值 x*z=200*3
it1.next(val2 / 2); // 20 300 3
it2.next(val1 / 4); // 200 10 3
console.log(val1, val2);

