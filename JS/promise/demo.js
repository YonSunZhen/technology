function Demo (execute) {

  // this便于在then方法中调用
  this.fulfilled = 'fulfilled'; // 已完成
  this.rejected = 'rejected'; // 已拒绝
  this.pedding = 'pedding'; // 未执行完的异步函数
  this.status = this.pedding;
  this.value;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];
  // resolve之后切换状态为fulfilled
  // reject之后切换状态为rejected
  // 如何达到传值的效果
  // 存在多个then如何处理
  const resolve = (value) => {
    this.status = this.fulfilled;
    this.value = value;
    this.onFulfilledCallbacks.forEach((item) => item());
  }

  const reject = () => {

  }

  // 执行入口函数
  execute(resolve, reject);

}

Demo.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  // 必须设置为setTimeout, 才能保证顺序不变
  // 要求可以多个then连续调用 因此得返回一个promise
  // setTimeout中可能包含setTimeout
  // 当执行then方法时 this指向的是上一个promise的
  if (that.status === that.fulfilled) {
    console.log('status为fulfilled');
    let promise2 = new Demo((resolve, reject) => {
      setTimeout(() => {
        let x = onFulfilled(that.value);
        if (x) {
          // 如果then存在 说明返回了一个promise 所以要等返回的promise resolve之后 这边才可以resolve 
          // 所以这里采用的方法是将resolve放在返回的promise的then里面执行 这样前面的resolve肯定就在最后面执行了 很牛皮 
          let then = x.then;
          if (then) {
            // 这里有点神奇!!!
            then.call(x, resolve, reject);
          }
        } else {
          resolve();
        }
      })
    })
    return promise2;
  }
  // then进入这里 将异步的函数push进onFulfilledCallbacks 等到执行完resolve里面的再依次执行
  if (that.status === that.pedding) {
    // console.log('status为pedding');
    let promise2 = new Demo((resolve, reject) => {
      // 必须将onFulfilled写在一个function里面
      // that.onFulfilledCallbacks指的是上一个(promsie或then)里面的 有很多个onFulfilledCallbacks
      that.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          // 这种写法也能执行onFulfilled(...) x为这个函数的返回值
          // 两种情况 有返回值 || 没有返回值
          // 没有返回值 直接执行resolve(...)
          // 有返回值
          let x = onFulfilled(that.value);
          if (x) {
            // console.log('这里是调试3');
            // 如果then存在 说明返回了一个promise 所以要等返回的promise resolve之后 这边才可以resolve 
            // 所以这里采用的方法是将resolve放在返回的promise的then里面执行 这样前面的resolve肯定就在最后面执行了 很牛皮
            let then = x.then;
            if (then) {
              // console.log('这里是调试33');
              // 这里有点神奇!!!
              then.call(x, resolve, reject);
            }
          } else {
            // console.log('这里是调试4');
            resolve();
          }

          // 执行了resolve才会将状态改变 接着才能进入到下一个then回调里面
          // resolve();

          // let x = onFulfilled(that.value);
          // resolvePromise(promise2, x, resolve, reject); // 难点
        })
      });
      // that.onRejectedCallbacks.push(onRejected);
    })
    return promise2;
  }
}

// 到底为什么???
function resolvePromise (promise2, x, resolve, reject) {
  let self = this;
  let used;
  // 调用者then中返回了对象
  if (x && typeof x === 'object' || typeof x === 'function') {
    // console.log('then方法返回了对象');
    try {
      let then = x.then;
      // console.log('这里是调试1');
      // console.log(then);

      // call里面的x改变的是this的选项 y和r表示then方法里面接受两个方法 onFulfilled与onRejected
      // 这里为什么要这么写?
      then.call(x, (y) => {
        if (used) return;
        used = true;
        resolvePromise(promise2, y, resolve, reject);
      }, (r) => {

      });
    } catch (e) {

    }
  } else {
    // 当then中没有返回promise时 就执行resolve 改变状态
    resolve(x);
  }
}

// const promise = new Demo((resolve, reject) => {
//   // 这里执行完之后再去执行push到onFulfilledCallbacks里面的关于then的 因此这里是最先执行的
//   // setTimeout(() => {
//   //   console.log('debug9');
//   //   resolve('33');
//   // }, 2000);
//   console.log('debug9');
//   resolve('33');
// });

// const haha = promise.then((data) => {
//   // setTimeout之中还有setTimeout
//   return new Demo((resolve, reject) => {
//     setTimeout(() => {
//       console.log('debug8');
//       resolve();
//     }, 5000)
//   })

//   // setTimeout(() => {
//   //   console.log('debug8');
//   // }, 200)

// })
// const haha1 = haha.then(() => {
//   return new Demo((resolve, reject) => {
//     setTimeout(() => {
//       console.log('debug7');
//       resolve();
//     }, 500)
//   })
//   // console.log('debug7');
// })

// const haha2 = haha1.then(() => {
//   return new Demo((resolve, reject) => {
//     setTimeout(() => {
//       console.log('debug6');
//       resolve();
//     }, 200)
//   })
//   // console.log('debug6');
// })
// const haha3 = haha2.then(() => {
//   console.log('debug5');
// })



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

const promise = new Demo((resolve, reject) => {
  setTimeout(() => {
    console.log('这里是调试1'); // 1
    resolve(33);
  }, 2000)
})
promise.then((data) => {
  const haha = new Demo((resolve) => {

    setTimeout(() => {
      console.log('这里是调试2'); // 2
      console.log(data); // 3
      resolve()
      // return 44;
    }, 1500);
  })
  // 这里为什么是在最后面输出来
  const h2 = haha.then(() => {
    return new Demo((resolve, reject) => {
      setTimeout(() => {
        console.log('这里是调试22');
        resolve();
      }, 3000)
    })
  })
  h2.then(() => {
    return new Demo(r => {
      setTimeout(() => {
        console.log('这里是调试222');
        r(1)
      }, 1000);
    })
  })
  return h2;

}).then(() => {
  const haha1 = new Demo((resolve) => {

    setTimeout(() => {
      console.log('这里是调试3');
      resolve();
    }, 1000)
  })
  return haha1;
}).then(() => {
  console.log('这里是调试4'); // 2
})
