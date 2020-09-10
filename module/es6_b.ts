import b from './es6_a';
console.log('这里是调试1');
console.log(b);
setTimeout(() => {
  console.log('这里是调试3');
  console.log(b);
},3000)