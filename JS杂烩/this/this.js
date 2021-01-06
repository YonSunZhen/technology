// 以下案例均在浏览器环境运行

// 默认绑定
var a = 2;
function foo() {
  console.log(this.a);
}
foo(); // 2  foo(...)在全局模式下被调用 因此this指向window

// 隐式绑定
function foo() {
  console.log(this.a);
}
const obj = {
  a: 2,
  foo: foo
};


// 当函数引用有上下文对象时 隐式绑定规则会将函数调用中的this绑定到这个上下文对象
obj.foo(); // 2

const _obj = {
  a: 42,
  obj: obj
};
// 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用
_obj.obj.foo(); // 2


var bar = obj.foo;
var a = "oops, global";
bar(); // oops, global


function doFoo(fn) {
  fn();
}
var a = 'oops, global';
doFoo(obj.foo); // oops, global


// 显式绑定
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2
};
function doFoo(fn) {
  fn.call(obj);
}
doFoo(foo);

function foo(el) {
  console.log(el, this.id);
}
var obj = {
  id: 'awesome'
};
[1,2,3].forEach(foo, obj);

// new绑定
function foo(a) {
  this.a = a;
}
const bar = new foo(2);
console.log(bar.a);

let a = [1,2,3];
let b = [4,5,6];
let c = (b = a);
console.log(b);
console.log(c);

// 箭头函数
function foo() {
  return (a) => {
    console.log(this.a);
  }
}
const obj1 = {
  a: 2
}
const obj2 = {
  a: 3
}
const bar = foo.call(obj1);
bar.call(obj2); // 2


function foo() {
  return function _foo(a){
    console.log(this.a);
  }
}
const obj1 = {
  a: 2
}
const obj2 = {
  a: 3
}
const bar = foo.call(obj1);
bar.call(obj2); // 3






