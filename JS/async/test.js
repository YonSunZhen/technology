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
  // console.log(yield Promise.resolve(1));
  // console.log(yield Promise.resolve(2));
  // console.log(yield Promise.resolve(3));
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
