const promise1 = require('./promise1');

const promise = new promise1((resolve, reject) => {
  // 这里执行完之后再去执行push到onFulfilledCallbacks里面的关于then的 因此这里是最先执行的
  setTimeout(() => {
    console.log('debug9');
    resolve('33');
  }, 2000);
  // console.log('debug9');
  // resolve('33');
});

const haha = promise.then((data) => {
  // setTimeout之中还有setTimeout
  return new promise1((resolve, reject) => {
    setTimeout(() => {
      console.log('debug8');
      resolve();
    }, 5000)
  })

  //待办 如果返回值一个普通函数是这种情况怎么办
  // return function () {
  //   console.log('debug8');
  // }

  // setTimeout(() => {
  //   console.log('debug8');
  // }, 200)

})
const haha1 = haha.then(() => {
  return new promise1((resolve, reject) => {
    setTimeout(() => {
      console.log('debug7');
      resolve();
    }, 500)
  })
  // console.log('debug7');
})

const haha2 = haha1.then(() => {
  console.log('这里是调试1');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('debug6');
      resolve();
    }, 200)
  })
  // console.log('debug6');
})
const haha3 = haha2.then(() => {
  console.log('debug5');
})


// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('这里是调试1');
//     resolve(33);
//   })
// })
// promise.then((data) => {
//   setTimeout(() => {
//     console.log('这里是调试2');
//     console.log(data);
//     // return 44;
//   });
// }).then(() => {
//   console.log('这里是调试3');
// })
// 这里是调试1
// 这里是调试3
// 这里是调试2
// 33

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('这里是调试1'); // 1
    resolve(33);
  }, 2000)
})
promise.then((data) => {
  const haha = new Promise((resolve) => {

    setTimeout(() => {
      console.log('这里是调试2'); // 2
      console.log(data); // 3
      resolve()
      // return 44;
    }, 1500);
  })
  // 这里为什么是在最后面输出来
  const h2 = haha.then(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('这里是调试22');
        resolve();
      }, 3000)
    })
  })
  h2.then(() => {
    return new Promise(r => {
      setTimeout(() => {
        console.log('这里是调试222');
        r(1)
      }, 1000);
    })
  })
  return h2;

}).then(() => {
  const haha1 = new Promise((resolve) => {

    setTimeout(() => {
      console.log('这里是调试3');
      resolve();
    }, 1000)
  })
  return haha1;
}).then(() => {
  console.log('这里是调试4'); // 2
})
