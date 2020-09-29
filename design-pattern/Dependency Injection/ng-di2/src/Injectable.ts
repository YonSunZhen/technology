import { Type } from './type';
import 'reflect-metadata';

const INJECTABLE_METADATA_KEY = Symbol('INJECTABLE_KEY');

// 必须被这个装饰器修饰的Class才说明是可以被注入的 (表示Class自己承认是可被注入的)
export function Injectable() {
  return function(target: any) {
    Reflect.defineMetadata(INJECTABLE_METADATA_KEY, true, target);
    return target;
  }
}

// 检查Class是否可被注入
export function isInjectable<T>(target: Type<T>) {
  return Reflect.getMetadata(INJECTABLE_METADATA_KEY, target) === true;
}