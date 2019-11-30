const promise1 = require('./promise1');

const test = new promise1((resolve, reject) => {
  console.log('debug1');
  resolve(1);
})
test.then((data) => {
  console.log('debug2');
  console.log(data);
  return 2;
}).then(() => {
  console.log('debug3');
  // console.log(res);
})
