const MyPromise = require('./promise');

// resolve reject 是MyPromise中的两个方法
// const test = new MyPromise((resolve, reject) => {
//   console.log('debug1');
//   resolve('11111');
// });


// test.then((data) => {
//   console.log('debug2');
//   console.log(data);
//   return 'aaaaaa'; 
// }).then(() => {
//   console.log('debug4');
// })
// console.log('debug9');
// console.log(test1);


let r;
const test = new MyPromise((resolve, reject) => {
  console.log('debug1');
 r=resolve;
});


test.then((data) => {
  console.log('debug2');
  console.log(data);
  return 'aaaaaa'; 
})
test.then((data) => {
  console.log('debug2');
  console.log(data);
  return 'aaaaaa'; 
})
test.then((data) => {
  console.log('debug2');
  console.log(data);
  return 'aaaaaa'; 
})
test.then((data) => {
  console.log('debug2');
  console.log(data);
  return 'aaaaaa'; 
})

r('1111111111')