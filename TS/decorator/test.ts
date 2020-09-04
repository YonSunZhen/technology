class A {
  a1 = 1;
  constructor() {
  }
  a() {
    console.log('这里是调试1');
  }
}

class B extends A {
  // constructor() {
  //   super();
  // }
  b1 = 2;
  b() {
    console.log('这里是调试2');
  }
}
const haha = new B();
haha.b()
