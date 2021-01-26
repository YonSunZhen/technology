import { Type } from './type';

// 唯一标志
export class InjectionToken {
  constructor(
    public injectionIdentifier: string
  ) {

  }
}

export type Token<T> = Type<T> | InjectionToken;

export type Factory<T> = () => T;

export interface BaseProvider<T> {
  provide: Token<T>;
}

// 提供一个类 用于创建依赖对象
export interface ClassProvider<T> extends BaseProvider<T> {
  useClass: Type<T>;
}

// 提供一个已存在的值 作为依赖对象
export interface ValueProvider<T> extends BaseProvider<T> {
  useValue: T
}

export interface FactoryProvider<T> extends BaseProvider<T> {
  useFactory: Factory<T>
}

export type Provider<T> = ClassProvider<T> | ValueProvider<T> | FactoryProvider<T>;

// is 缩小类型 判断是否属于某种类型
export function isClassProvider<T>(provider: BaseProvider<T>): provider is ClassProvider<T> {
  return (provider as any).useClass  !== undefined;
}

export function isValueProvider<T>(provider: BaseProvider<T>): provider is ValueProvider<T> {
  return (provider as any).useValue  !== undefined;
}

export function isFactoryProvider<T>(provider: BaseProvider<T>): provider is FactoryProvider<T> {
  return (provider as any).useFactory !== undefined;
}