let a = 555;
setTimeout(() => {
  console.log('这里是调试2');
  a = 666;
  console.log(a);
},2000)
export default a;