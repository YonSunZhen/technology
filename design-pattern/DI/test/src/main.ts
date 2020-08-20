import 'reflect-metadata';

// 工厂里面的各种操作
export class Injector {
  // 所以provider存在的意义是什么 可能有多个provider 这个例子暂时只有一个
  private readonly providerMap: Map<any, any> = new Map();
  private readonly instanceMap: Map<any, any> = new Map();
  public setProvider(key: any, value: any): void {
    if (!this.providerMap.has(key)) {
      this.providerMap.set(key, value);
    }
  }
  public getProvider(key: any): any {
    return this.providerMap.get(key);
  }
  public setInstance(key: any, value: any): void {
    if (!this.instanceMap.has(key)) this.instanceMap.set(key, value);
  }
  public getInstance(key: any): any {
    if (this.instanceMap.has(key)) return this.instanceMap.get(key);
    return null;
  }
  public setValue(key: any, value: any): void {
    if (!this.instanceMap.has(key)) this.instanceMap.set(key, value);
  }
}

// 表示根注入器(用于存放各个依赖的工厂)
export const rootInjector = new Injector();

// 将类注入到工厂中 类装饰器返回一个值，它会使用提供的构造函数来替换原来类的声明
// 执行Injectable返回一个装饰器函数
export function Injectable(): (_constructor: any) => any {
  return function (_constructor: any): any {
    rootInjector.setProvider(_constructor, _constructor);
    return _constructor;
  };
}

// 将依赖注入到生产者
export function Inject(): (_constructor: any, propertyName: string) => any {
  return function (_constructor: any, propertyName: string): any {
    // 获取属性的类型
    const  propertyType: any = Reflect.getMetadata('design:type', _constructor, propertyName);
    const injector: Injector = rootInjector;
    let providerInsntance = injector.getInstance(propertyType); 
    if (!providerInsntance) {
      const providerClass = injector.getProvider(propertyType);
      providerInsntance = new providerClass();
      injector.setInstance(propertyType, providerInsntance);
    }
    _constructor[propertyName] = providerInsntance;
  };
}

@Injectable()
class Cloth {
  public name: string = '麻布';
}

@Injectable()
class Clothes {
  // 为类Clothes注入类Cloth 之后类Clothes就拥有了使用类Cloth的能力
  // 将类Cloth注入到类Clothes中的构造函数中???
  // 所以这样会直接修改到Clothes类的内部逻辑?
  @Inject() 
  public cloth: Cloth;
  public clotheName: string;
  constructor() {
    this.cloth = this.cloth;
    this.clotheName = this.clotheName;
  }
  updateName(name: string) {
    this.clotheName = name;
  }
}

class Human1 {
  @Inject() 
  public clothes: Clothes;
  public name: string;
  constructor(name: string) {
    this.clothes = this.clothes;
    this.name = name;
  }
  update(name: string) {
    this.clothes.updateName(name);
  }
}

// class Human2 {
//   @Inject() 
//   public clothes: Clothes;
//   public name: string;
//   constructor(name: string) {
//     this.clothes = this.clothes;
//     this.name = name;
//   }
//   update(name: string) {
//     this.clothes.updateName(name);
//   }
// }

// class Human3 {
//   @Inject() 
//   public clothes: Clothes;
//   public name: string;
//   constructor(name: string) {
//     this.clothes = this.clothes;
//     this.name = name;
//   }
// }

// 总结
// 单例：用于数据状态的维护(一个变 所有变)
const pepe1 = new Human1('syz');
console.log(pepe1);
pepe1.update('耐克');

// const pepe2 = new Human2('syc');
// console.log(pepe2);
// const pepe3 = new Human1('syt');
// console.log(pepe3);
// pepe2.update('阿迪达斯')

