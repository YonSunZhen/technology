function run(gen) {
  console.log('debug1');
  console.log(arguments);
  
  // slice() 方法可从已有的数组中返回选定的元素
  let args = [].slice.call(arguments, 1); // 返回arguments参数 从第二个开始算起到最后一个的数组(第一个为什么不要)
  console.log('debug2');
  console.log(args);
  
  let it;
  // 在当前上下文中初始化生成器
  it = gen.apply(this, args);
  // 返回一个promise用于生成器完成
  return Promise.resolve()
    .then(function handleNext(value) {
      // 对下一个yield出的值运行
      let next = it.next(value);
      console.log('debug3');
      console.log(next);
      
      // 立即执行函数
      return (function handleResult(next) {
        // 生成器运行完毕了吗?
        if(next.node) {
          return next.value;
        } else { // 否则继续运行
          return Promise.resolve(next.value)
            .then (
              // 成功就恢复异步循环,把决议的值发回生成器
              handleNext,
              // 如果value是被拒绝的promise,
              // 就把错误传回生成器进行出错处理
              function handleErr(err) {
                return Promise.resolve(
                  it.throw(err)
                ).then(handleResult);
              }
            )
        }
      })(next);
    })
}
// 模拟多个异步情况
function foo1(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(x);
      resolve(); // 如果没有决议(resolve)就不会运行下一个
    }, 3000)
  })
}
function foo2(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(x);
      // resolve();
    }, 0)
  })
}
function *main() {
  try {
    let temp = yield foo1(9);
    let text = yield foo2(11);
    // console.log(temp);
    // console.log(text);  
  } catch (err) {
    console.log(err);
  }
}
run(main);

// async function test() {
//   await foo1(9);
//   await foo2(11);
// }
// test();
