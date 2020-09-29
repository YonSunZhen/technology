import { Token } from './provider';
import 'reflect-metadata';

const INJECT_METADATA_KEY = Symbol('INJECT_KEY');

// 参数装饰器 接受3个参数
// target: Object —— 被装饰的类
// propertyKey: string | symbol —— 方法名
// parameterIndex: number —— 方法中参数的索引值
// 在构造器中的参数使用
export function Inject(token: Token<any>) {
  return function(target: any, _: string | symbol, index: number) {
    Reflect.defineMetadata(INJECT_METADATA_KEY, token, target, `index-${index}`);
    return target;
  };
}