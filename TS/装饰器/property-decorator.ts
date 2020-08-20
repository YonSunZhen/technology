// 属性装饰器

import "reflect-metadata";

// 用来记录某个属性的元数据
const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter1 {

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
const test = new Greeter1('syz').greet();
console.log(test);

// 属性装饰器表达式在运行时当作函数被调用，传入下列2个参数
// 1、对于静态成员来说是类的构造函数(构造函数中有什么属性，new类的时候才有什么属性)，对于实例成员是类的原型对象(原型链 用于类内部取值用 若类内部有值则优先用内部的值 否则去原型链上找 this.xxxx)
function logProperty(params: any) {
  console.log('这里是调试1');
  // target--->类的原型对象；attr--->传入的参数url
  return function (target: any, attr: any) {
    target[attr] = params
  }
}

class HttpClient {

  @logProperty('http://www.baidu.com')
  public url: any | undefined = 666;
  constructor() {
    this.url = this.url;
  }
  getData() {
    console.log('这里是调试3');
    console.log(this.url);
  }
}

let http = new HttpClient();
http.getData();
console.log('这里是调试4');
console.log(http);

