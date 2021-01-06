function foo(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(x);
      resolve(12);
    }, 1000)
  })
}
function *main() {
  try {
    let text = yield foo(11);
    console.log(text);
  } catch (err) {
    console.log(err);
  }
}
let it = main();
let p = it.next().value; // p等于yield foo(11)返回的promise
p.then(
  function(text) {
    console.log(text);
  },
  function(err) {
    it.throw(err);
  }
)


function run(gen) {
  // slice() 方法可从已有的数组中返回选定的元素
  let args = [].slice.call(arguments, 1); // 返回arguments参数 从第二个开始算起到最后一个的数组(第一个为什么不要)
  console.log('这里是调试1');
  console.log(args);
  let it;
  // 在当前上下文中初始化生成器
  it = gen.apply(this, args);
  // 返回一个promise用于生成器完成
  return Promise.resolve()
    .then(function handleNext(value) {
      // 对下一个yield出的值运行
      let next = it.next(value);  
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
run(main);




function run(generatorFunc) {
  return function() {
    const gen = generatorFunc();
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
        const { value, done } = generatorResult;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(val => step('next', val), err => step('throw', err));
        }
      }
      step("next");
    })
  }
}


// 模拟多个异步情况
function foo1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100); // 如果没有决议(resolve)就不会运行下一个
    }, 3000)
  })
}
function foo2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(200);
    }, 2500)
  })
}

function *test() {
  const f1 = yield foo1();
  const f2 = yield foo2();
  console.log('这里是调试1');
  console.log(f1);
  console.log(f2);
  return 'haha';
}
const haha = run(test);
haha().then((data) => {
  console.log('这里是调试2');
  console.log(data);
});





// 模拟多个异步情况
function foo1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100); // 如果没有决议(resolve)就不会运行下一个
    }, 3000)
  })
}
function foo2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(200);
    }, 2500)
  })
}

async function test() {
  const f1 = await foo1();
  const f2 = await foo2();
  console.log('这里是调试1');
  console.log(f1);
  console.log(f2);
  return 'haha';
}
test().then((data) => {
  console.log('这里是调试2');
  console.log(data);
});



// 在map中用async 使用Promise.all https://www.cnblogs.com/LULULI/p/10831523.html
const arr = [
  {name: 'syz', type: 1},
  {name: 'haha', type: 2}
]
function promise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('这里是调试1');
      resolve(111);
    }, 1000)
  })
}
async function test() {
  const data = await promise();
  return data;
}
async function fun() {
  const temp = await Promise.all(arr.map(async (a) => {
    return {
      type: await test()
    }
  }))
  return temp;
}
fun().then((data) => {
  console.log('这里是调试2');
  console.log(data);
});