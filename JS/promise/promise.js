// 三个状态
const pending = 'pending'; // 进行中
const fulfilled = 'fulfilled'; // 已成功 
const rejected = 'rejected'; // 已失败

function MyPromise (executor) {
  let self = this;
  self.status = pending;
  self.onFulfilled = []; //成功的回调
  self.onRejected = []; //失败的回调

  function resolve (value) {
    if (self.status === pending) {
      self.status = fulfilled;
      self.value = value;
      self.onFulfilled.forEach(fn => fn()); // 这句话的作用是什么
      console.log('执行了resolve');
      console.log(self.onFulfilled.length);
    }
  }

  function reject (reason) {
    if (self.status === pending) {
      self.status = rejected;
      self.reason = reason;
    }
  }

  // 外部new MyPromise实际上就是执行这个executor
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// then方法中可以传进去两个参数，一个成功时的函数，一个失败时的函数
// then方法必须返回一个promise对象
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 调用then方法时,self指的是上一级的
  let self = this;
  // then必须返回一个promise 一个then方法就生成一个新的promise
  let promise2 = new MyPromise((resolve, reject) => {
    // 第一个resolve()会进入这里
    if (self.status === fulfilled) {
      console.log('已完成');
      // setTimeout的作用是将所有的同步方法、异步方法转化为异步调用
      setTimeout(() => {
        try {
          // onFulfilled指的是then方法里面的成功的函数 self.value表示上一级传过来的值
          let x = onFulfilled(self.value); //?
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      })
    } else if (self.status === pending) { // 这又是什么鬼东西？ 如果存在多个then，除了最后一个不会进入这里，其他的then都会进入这里
      console.log('进行中');
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject); // 难点
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  })
  return promise2;

}
// 难点
function resolvePromise (promise2, x, resolve, reject) {
  let self = this;
  let used;
  // 调用者then中返回了对象
  if (x && typeof x === 'object' || typeof x === 'function') {
    console.log('then方法返回了对象');
    try {
      let then = x.then;
      then.call(x, (y) => {
        if (used) return;
        used = true;
        resolvePromise(promise2, y, resolve, reject);
      }, (r) => {

      });
    } catch (e) {

    }
  } else {
    // 如果没有返回对象或者只返回了一个值
    console.log('then方法没有返回对象');
    resolve(x);
  }
}

module.exports = MyPromise;