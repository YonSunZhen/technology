
// 所有的装饰器均是在定义时已执行???
// 类装饰器表达式会在运行时当作函数被调用(声明装饰函数即运行,无需等到实例化类)

// 装饰类中的构造函数 此时需要再装饰器中返回一个函数 装饰器中的值为最终值
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
  console.log('装饰器已执行');
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  }
}
@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
      this.hello = m;
      console.log(this.hello); 
  }
}
console.log(new Greeter("world"));
// 装饰器已执行
// world
// Greeter {
//   property: 'property',
//   hello: 'override',
//   newProperty: 'new property'
// }



// 装饰类中的方法
function cheating(target: any) {
  target.prototype.hit = function(rival: Somebody) {
    const hitDamage: number = 100;
    console.log(`${this.name}对${rival.name}造成一次伤害: ${hitDamage}`);
  }
}

class Somebody {
  speed: number = 10;
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  hit(rival: Somebody) {
    const hitDamage: number = 10;
    console.log(`${this.name}对${rival.name}造成一次伤害：${hitDamage}`);
  }
}

@cheating
class SBody extends Somebody{

}

const s0 = new Somebody('小红0');
const s1 = new SBody('小红1');
const rival = new Somebody('小明');
s0.hit(rival); // 小红0对小明造成一次伤害：10
s1.hit(rival); // 小红1对小明造成一次伤害: 100