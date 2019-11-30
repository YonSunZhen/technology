const MyPromise = require('./promise');

// resolve reject 是MyPromise中的两个方法
const test = new MyPromise((resolve, reject) => {
  console.log('debug1');
  resolve('11111');
})


test.then((data) => {
  console.log('debug2');
  console.log(data);
  return 'aaaaaa'; 
}).then((res) => {
  console.log(res);
  console.log('debug3');
}).then(() => {
  console.log('debug4');
}).then(() => {
  console.log('debug5');
})
// console.log('debug9');
// console.log(test1);



