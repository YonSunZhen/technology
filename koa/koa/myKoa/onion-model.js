function compose(middlewareArr) {
  return (ctx, next) => {
    // const mw = middlewareArr[0];
    // mw(null, middlewareArr[1].bind(null, null, middlewareArr[2].bind(null, null, middlewareArr[3])));
    const fn = (i) => {
      const currentMW = middlewareArr[i];
      if(!currentMW) {
        return Promise.resolve();
      }
      // 这里有点绕 bind 相当于复制函数体 不会执行函数内部逻辑
      return Promise.resolve(currentMW(ctx, fn.bind(null, ++i)));
    }
    return fn(0);
  }
}

const middlewares = [];

const middleware1 = async (ctx, next) => {
  console.log('debug1');
  await next();
  console.log('debug2');
}

const middleware2 = async (ctx, next) => {
  return new Promise((res, rej) => {
    setTimeout(async () => {
      console.log('debug3');
      await next();
      console.log('debug4');
      res();
    }, 3000);
  })
}

const middleware3 = async (ctx, next) => {
  console.log('debug5');
  await next();
  console.log('debug6');
}

const middleware4 = async (ctx, next) => {
  console.log('debug7');
}

function use(m) {
  middlewares.push(m);
}

use(middleware1);
use(middleware2);
use(middleware3);
use(middleware4);

const fn = compose(middlewares);
fn().then(() => {
  console.log('debug8');
})


// function compose(middlewares) {
//   return function (context, next) {
//     function dispatch(i) {
//       let fn = middlewares[i];
//       if(i === middlewares.length) {
//         fn = next;
//       }
//       if(!fn) {
//         return Promise.resolve();
//       }
//       try {
//         return Promise.resolve(fn(context, () => {
//           return dispatch(i+1);
//         }));
//       } catch (e) {
//         return Promise.reject(e);
//       }
//     }
//     return dispatch(0);
//   }
// }

// const middlewares = [];
// async function a(ctx, next) {
//   console.log('这里是调试1');
//   const r = await next();
//   console.log(r);
//   console.log('这里是调试2');
// }
// async function b(ctx, next) {
//   console.log('这里是调试3');
//   await next();
//   console.log('这里是调试4');
//   return 'b';
// }
// middlewares.push(a);
// middlewares.push(b);
// compose(middlewares)({}).then(v => {
//   console.log('这里是调试5');
// });


// const middleware = [];
// let mw1 = async function (ctx, next) {
//   console.log('next前，第一个中间件');
//   await next();
//   console.log('next后，第一个中间件');
// }
// let mw2 = async function (ctx, next) {
//   return new Promise(async (res, rej) => {
//     setTimeout(async () => {
//       console.log('next前，第二个中间件');
//       await next();
//       console.log('next后，第二个中间件');
//       res();
//     }, 2000)
//   })
// }
// let mw3 = async function () {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       console.log('第三个中间件，没有next了');
//       res();
//     }, 1000)
//   })
// }

// function use(mw) {
//   middleware.push(mw);
// }

// use(mw1);
// use(mw2);
// use(mw3);

// let i = 0;
// let fn = function (ctx) {
//   // let currentMW = middleware[i];
//   // return currentMW(ctx, middleware[++i]);
//   return dispatch(0);
//   function dispatch(i) {
//     let currentMW = middleware[i];
//     if(!currentMW) {
//       return;
//     }
//     // bind返回了一个函数体 并没有执行函数
//     return currentMW(ctx, dispatch.bind(null, i + 1));
//   }
// }

// fn();
