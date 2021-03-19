type User = {
  readonly name?: string;
  age?: number;
};

// https://segmentfault.com/a/1190000023943952
// & 运算符 将多个类型合并为一个类型
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };
let point: Point = {
  x: 1
}

// 同名基础类型属性的合并
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string
}

type XY = X & Y;
type YX = Y & X;

let p: XY;
let q: YX;

p = { c: 6, d: "d", e: "e" };
q = { c: 6, d: "d", e: "e" };
// 这是因为混入后成员 c 的类型为 string & number，即成员 c 的类型既可以是 string 类型又可以是 number 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 never

// 同名非基础类型属性的合并
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};
// 在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并


// | 分隔符 表示取值可以为多种类型中的一种
const sayHello = (name: string | undefined) => { /* ... */ };

sayHello("semlinker");
sayHello(undefined);


// keyof 关键字
type TA = keyof User;
const ta: TA = 'name'; // 实例必须是类型属性其中的一个

// typeof 关键字
const fn = () => {
  return {name: 'balsius', age: 18}
};
type TB = typeof fn; // 类型TB是一个函数并且返回值为{name: 'balsius', age: 18}
const tb: TB = () => {
  return {name: 'balsius1', age: 181}
};

// extends 关键字
function logLength<T>(arg: T) {
  console.log(arg.length); // 类型“T”上不存在属性“length”
}

interface ILengthy {
  length: number;
}
function logLength2<T extends ILengthy>(arg: T) {
  console.log(arg.length);
}

// infer 关键字 一般用于类型提取 将User从Promise<User>中提取出来 有点深奥啊
type UserPromise = Promise<User>;

type UnPromisify<T> = T extends Promise<infer V> ? V : never;
type InferedUser = UnPromisify<UserPromise>;

// Partial<T> 给定一个输入的object类型T 返回一个新的object类型 这个object类型的每一个属性都是可选的
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};
type PartialUser = MyPartial<User>; // {name?: string, age?: number}

// Required<T> -表示去除的意思???
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};
type RequiredUser = MyRequired<User>;

// Mutable<T> 有readonly修饰的全部去掉
type MyMutable<T> = {
  -readonly [K in keyof T]: T[K];
}
type MutableUser = MyMutable<User>;

// Record<K, T> 得到一个由K中每个值作为键，值类型为T的新的Object类型 很牛皮 通俗点讲就是将原来定义的字段类型改写
type petsGroup = 'dog' | 'cat' | 'fish';
interface IPetInfo {
    name:string,
    age:number,
}

type IPets = Record<petsGroup, IPetInfo>;

const animalsInfo:IPets = {
    dog:{
        name:'dogName',
        age:2
    },
    cat:{
        name:'catName',
        age:3
    },
    fish:{
        name:'fishName',
        age:5
    }
}




