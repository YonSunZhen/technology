function classDecoratorTest<T extends {new(...args:any[]):{}}>(constructor:T) {
  console.log('装饰器已执行');
  return class extends constructor {
      newProperty = "new property";
      hello = "override";
  }
}
@classDecoratorTest
class ClassTest {
  property: string;
  hello: string;
  constructor(m: string) {
      this.hello = m;
      console.log(this.hello); 
  }
}
console.log(new ClassTest("world"));