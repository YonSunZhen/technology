function promise(exectue) {
  this.fulfilled = 'fulfilled';
  this.pedding = 'pedding';
  this.rejected = 'rejected';
  this.status = this.pedding;
  this.value;
  this.reason;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];
  const resolve = (value) => {
    if(this.status === this.pedding) {
      // 执行了resolve就要改变status为fulfilled
      this.status = this.fulfilled;
      this.value = value;
      // 遍历执行放在待办数组中的事件
      this.onFulfilledCallbacks.forEach(fn => fn());
    }
  }
  const reject = (reason) => {
    if(this.status === this.pedding) {
      // 执行了reject就要改变status为rejected
      this.status = this.rejected;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn => fn());
    }
  }
  exectue(resolve, reject);
}
// then方法返回一个promise 这里不要用箭头函数 箭头函数自己本身没有this
promise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  const promise2 = new promise((resolve, reject) => {
    if(that.status === that.fulfilled) {
      // x为这个方法return的值
      let x = onFulfilled(that.value);
      console.log('这里是调试4');
      console.log(x);
      // 验证then是否有return promise
      if(x && typeof x === 'object' || typeof x === 'function') {
        let then = x.then;
        // 如果then方法中有返回promise 需要将resolve放在最后面执行
        if(then) {
          // call主要是问了绑定this的指向
          then.call(x, resolve, reject);
        }
      } else {
        resolve(x);
      }
    }
    if(that.status === that.pedding) {
      that.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          // that.value是上一个resolve里面放的值 表示传递给后面的值
          let x = onFulfilled(that.value);
          if (x && typeof x === 'object' || typeof x === 'function') {
            // 如果then存在 说明返回了一个promise 所以要等返回的promise resolve之后 这边才可以resolve 
            // 所以这里采用的方法是将resolve放在返回的promise的then里面执行 这样前面的resolve肯定就在最后面执行了 很牛皮
            let then = x.then;
            if (then) { 
              // 这里有点神奇!!!
              then.call(x, resolve, reject);
            }
          } else {
            resolve(x);
          }
        })
      })
      that.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          let x = onRejected(that.reason);
          if(x && typeof x === 'object' || typeof x === 'function') {
            let then = x.then;
            if(then) {
              then.call(x, resolve, reject);
            }
          } else {
            resolve(x);
          }
        })
      })
    }
    if(that.status === that.rejected) {
      let x = onRejected(that.reason);
      if(x && typeof x === 'object' || typeof x === 'function') {
        let then = x.then;
        // 如果then方法中有返回promise 需要将resolve放在最后面执行
        if(then) {
          then.call(x, resolve, reject);
        }
      } else {
        resolve(x);
      }
    }
  })
  return promise2;
}
// const test = new promise((resolve, reject) => {
//   resolve('666')
//   setTimeout(() => {
//     console.log('这里是调试1');
//     reject('error');
//   }, 2000);
// })
// test.then(
//   (data) => {
//     console.log(data);
    
//   },
//   (error) => {
//     return new promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(error);
//         resolve();
//       }, 3000);
//     })
//   }
// ).then(() => {
//   console.log('这里是调试2');
// })

// const promise1 = new promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('这里是调试1'); // 1
//     resolve(33);
//   }, 2000)
// })
// promise1.then((data) => {
//   const haha = new promise((resolve) => {

//     setTimeout(() => {
//       console.log('这里是调试2'); // 2
//       console.log(data); // 3
//       resolve()
//       // return 44;
//     }, 1500);
//   })
//   // 这里为什么是在最后面输出来
//   const h2 = haha.then(() => {
//     return new promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log('这里是调试22');
//         resolve();
//       }, 3000)
//     })
//   })
//   h2.then(() => {
//     return new promise(r => {
//       setTimeout(() => {
//         console.log('这里是调试222');
//         r(1)
//       }, 1000);
//     })
//   })
//   return h2;

// }).then(() => {
//   const haha1 = new promise((resolve) => {

//     setTimeout(() => {
//       console.log('这里是调试3');
//       resolve();
//     }, 1000)
//   })
//   return haha1;
// }).then(() => {
//   console.log('这里是调试4'); // 2
// })

// 这种情况怎么解释呢？ 这种方式就不属于链式调用了
const test = new promise((res, rej) => {
  setTimeout(() => {
    console.log('这里是调试1');
    res();
  }, 4000);
})
// 返回一个promise
test.then(() => {
  return new promise((res1) => {
    setTimeout(() => {
      console.log('这里是调试2');
      res1();
    }, 3000);
  })
})
// 这也返回了一个promise 两者没有任何联系
test.then(() => {
  console.log('这里是调试3');
})
