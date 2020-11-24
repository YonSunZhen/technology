function run(gen) {
  const g = gen();
  function _next(val) {
    const res = g.next(val);
    if(res.done) {
      return res.value;
    }
    res.value.then(val => {
      _next(val);
    })
  }
  _next();
}
function *myGenerator() {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('这里是调试1');
      resolve();
    }, 2000);
  })
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('这里是调试2');
      resolve();
    }, 1000);
  })
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('这里是调试3');
      resolve();
    }, 500);
  })
}
run(myGenerator);


// 模拟多个异步情况
function foo1(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(x);
      resolve(100); // 如果没有决议(resolve)就不会运行下一个
    }, 3000)
  })
}
function foo2(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(x);
      resolve();
    }, 0)
  })
}
function *main() {
  try {
    let temp = yield foo1(9);
    console.log('这里是调试2');
    console.log(temp);
    let text = yield foo2(11);
    console.log('这里是调试3');
    console.log(text);  
  } catch (err) {
    console.log(err);
  }
}

const gen  = main();

const dataPromise = gen.next();

dataPromise.value.then((val1) => {
  const data2Promise  = gen.next(val1);
  
})

// console.log('这里是调试1');
// console.log(dataPromise);


