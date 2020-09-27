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
console.log(Reflect.getMetadata('design:type', Post.prototype, 'haha'));