function promise (exectue) {
  this.fulfilled = 'fulfilled';
  this.pedding = 'pedding';
  this.rejected = 'rejected';
  this.status = this.pedding;
  this.value;
  this.reason;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];
  const res = (value) => {
    if (this.status === this.pedding) {
      // 执行了resolve就要改变status为fulfilled
      this.status = this.fulfilled;
      this.value = value;
      // 遍历执行放在待办数组中的事件
      this.onFulfilledCallbacks.forEach(fn => fn());
    }
  }
  const rej = (reason) => {
    if (this.status === this.pedding) {
      // 执行了reject就要改变status为rejected
      this.status = this.rejected;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn => fn());
    }
  }
  exectue(res, rej);
}

promise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  const promise2 = new promise((resolve, reject) => {
    if (that.status === that.fulfilled) {
      setTimeout(() => {
        let x = onFulfilled(that.value);
        if (x && typeof x === 'object' || typeof x === 'function') {
          let then = x.then;
          if (then) {
            then.call(x, resolve, reject);
          }
        } else {
          resolve(x);
        }
      })
    }
    if (that.status === that.pedding) {
      that.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          let x = onFulfilled(that.value);
          if (x && typeof x === 'object' || typeof x === 'function') {
            let then = x.then;
            if (then) {
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
          if (x && typeof x === 'object' || typeof x === 'function') {
            let then = x.then;
            if (then) {
              then.call(x, resolve, reject);
            }
          } else {
            resolve(x);
          }
        })
      })
    }
    if (that.status === that.rejected) {
      setTimeout(() => {
        let x = onRejected(that.reason);
        if (x && typeof x === 'object' || typeof x === 'function') {
          let then = x.then;
          if (then) {
            then.call(x, resolve, reject);
          }
        } else {
          resolve(x);
        }
      })
    }
  })
  return promise2;
}

// resolve对应的是promise(...)中的res(...)
// reject对应的是promise(...)中的rej(...)
// const test = new promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('这里是调试1');
//     resolve();
//   }, 1000)
// })
// test.then(() => {
//   // 若要阻塞then(...)中的异步事件需要return一个promise
//   return new promise((resolve1, reject1) => {
//     setTimeout(() => {
//       console.log('这里是调试2');
//       resolve1();
//     }, 2000)
//   })
// }).then(() => {
//   console.log('这里是调试3');
// })

new Promise(function (resolve) {
  console.log('这里是调试1');
  resolve();
}).then(function () {
  console.log('这里是调试2');
});
console.log('这里是调试3');