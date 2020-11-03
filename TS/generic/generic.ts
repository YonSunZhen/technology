type User = {
  readonly name?: string;
  age?: number;
};

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

// Record<K, T> 得到一个由K中每个值作为键，值类型为T的新的Object类型





