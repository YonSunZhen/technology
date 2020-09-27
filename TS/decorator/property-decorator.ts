// 属性装饰器
import "reflect-metadata";
// 用来记录某个属性的元数据
const formatMetadataKey = Symbol("format");
function format(formatString: string) {
  // Reflect.metadata返回一个函数 (target: Object, propertyKey: string | symbol): void
  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
  // 获取类中propertyKey的某个元数据(批注)
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
class Greeter {
  @format("Hello, %s")
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}
const test = new Greeter('syz').greet();
console.log(test); // Hello, syz


import 'reflect-metadata';
class Post {

  @Reflect.metadata('role', 'admin')
  haha: {haha?: string; test?: number}
}
const metadata = Reflect.getMetadata('role', Post.prototype, 'haha');
console.log(metadata);  // admin



// 属性装饰器表达式在运行时当作函数被调用，传入下列2个参数
// 1、对于静态成员来说是某个类，因为静态成员是类中固定的变量，不同的实例共享同一块静态成员内存(类名.xxx)
// 对于实例成员是类的原型对象(原型链 用于类内部取值用 若类内部有值则优先用内部的值 否则去原型链上找 this.xxxx)
// 2、成员的名字
function logProperty1(params: any) {
  // target--->类的原型对象；attr--->装饰的属性名
  return function (target: any, attr: any) {
    target[attr] = params;
  }
}
class HttpClient1 {
  @logProperty1('http://www.baidu1.com')
  url: any | undefined;
  constructor() {
  }
  getUrl() {
    console.log(this.url);
  }
}
class HttpClient2 {
  @logProperty1('http://www.baidu22.com')
  url: any | undefined = 'http://www.baidu2.com';
  constructor() {
  }
  getUrl() {
    console.log(this.url);
  }
}
let http1 = new HttpClient1();
http1.getUrl(); // http://www.baidu1.com
let http2 = new HttpClient2();
http2.getUrl(); // http://www.baidu2.com



function logProperty2(params: any) {
  // target--->类；attr--->装饰的属性名
  return function (target: any, attr: any) {
    target[attr] = params;
  }
}
class HttpClient3 {
  @logProperty2('http://www.baidu1.com')
  static url: any | undefined;
  constructor() {
  }
  getUrl() {
    console.log(HttpClient3.url);
  }
}
class HttpClient4 {
  @logProperty2('http://www.baidu22.com')
  static url: any | undefined = 'http://www.baidu2.com';
  constructor() {
  }
  getUrl() {
    console.log(HttpClient4.url);
  }
}
console.log(HttpClient3.url); // http://www.baidu1.com
console.log(HttpClient4.url); // http://www.baidu22.com


