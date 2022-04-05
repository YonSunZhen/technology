const object1 = {};

let temp = 1
Object.defineProperty(object1, 'a', {
  get() {
    console.log('debug2');
    return temp
  },
  set(newVal) { 
    temp = newVal
    console.log('debug1');
  },
  enumerable : true,
  configurable : true
});
console.log(object1.a);
setTimeout(() => {
  object1.a = 2
},5000)
// console.log(object1.a);

