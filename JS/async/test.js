// let x = 1;
// function *foo() {
//   x++;
//   yield; // 暂停
//   console.log("x:", x);
// }
// function bar() {
//   x++;
// }
// let it = foo(); // 并没有执行生成器*foo(),构造一个迭代器it来控制这个生成器
// it.next(); // 这里启动foo()
// console.log(x);
// bar();
// console.log(x);
// it.next();

// function *foo() {
//   let x = yield 2;
//   z++;
//   let y = yield (x * z);
//   console.log(x, y, z);
// }
// let z = 1;
// // 多个迭代器
// let it1 = foo();
// let it2 = foo();
// let val1 = it1.next().value;
// let val2 = it2.next().value;
// val1 = it1.next(val2 * 10).value;
// val2 = it2.next(val1 * 5).value;
// it1.next(val2/2);
// it2.next(val1/4);

function getAjaxData (cb) {
  // 用setTimeout实现异步请求
  setTimeout(function () {
    // 假设data是我们请求得到的数据 我们需要将数据发送给别人
    const data = "请求得到的数据";
    cb(data);
    cb(data);
  }, 1000)
}
// 获取ajax请求的响应数据并对数据进行处理
getAjaxData(function handleData (tempData) {
  tempData = tempData + '666';
  console.log(tempData); // 请求得到的数据666
});