// http://www.semlinker.com/ioc-and-di/#%E5%85%AD%E3%80%81%E6%89%8B%E5%86%99-IoC-%E5%AE%B9%E5%99%A8

import { 
  Token, Provider,
  isClassProvider, InjectionToken, isValueProvider,
  ClassProvider, ValueProvider, FactoryProvider
} from './provider';
import { isInjectable } from './Injectable';
import { Type } from './type';
import { getInjectionToken } from './Inject';

type InjectableParam = Type<any>;
const REFLECT_PARAMS = 'design:paramtypes';


export class Container {
  private providers = new Map<Token<any>, Provider<any>>();

  addProvider<T>(provider: Provider<T>) {
    this.assertInjectableIfClassProvider(provider);
    // 重复注入同个类的话 貌似是以后面的为准???
    this.providers.set(provider.provide, provider);
  }

  inject<T>(type: Token<T>): T {
    let provider = this.providers.get(type);
    // 忘记将Class执行addProvider
    if(provider === undefined && !(type instanceof InjectionToken)) {
      provider = { provide: type, useClass: type };
      this.assertInjectableIfClassProvider(provider);
    }
    return this.injectWithProvider(type, provider);
  }

  private assertInjectableIfClassProvider<T>(provider: Provider<T>) {
    if(isClassProvider(provider) && !isInjectable(provider.useClass)) {
      throw new Error(
        `Cannot provide ${this.getTokenName(provider.provide)} using class ${this.getTokenName( provider.useClass )}, 
        ${this.getTokenName(provider.useClass)} isn't injectable`
      );
    }
  }

  private getTokenName<T>(token: Token<T>) {
    return token instanceof InjectionToken ? token.injectionIdentifier : token.name
  } 

  private injectWithProvider<T>(type: Token<T>, provider?: Provider<T>): T {
    if (provider === undefined) {
      throw new Error(`No provider for type ${this.getTokenName(type)}`);
    }
    if (isClassProvider(provider)) {
      return this.injectClass(provider as ClassProvider<T>);
    } else if (isValueProvider(provider)) {
      return this.injectValue(provider as ValueProvider<T>);
    } else {
      return this.injectFactory(provider as FactoryProvider<T>);
    }
  }

  // 关键 在实例化服务类时 需要构造该服务类依赖的独享(即在构造函数中注入的依赖)
  private injectClass<T>(classProvider: ClassProvider<T>): T {
    const target = classProvider.useClass;
    const params = this.getInjectedParams(target);
    // ??? 这里的作用
    return Reflect.construct(target, params);
  }

  private injectValue<T>(valueProvider: ValueProvider<T>): T {
    return valueProvider.useValue;
  }

  private injectFactory<T>(factoryProvider: FactoryProvider<T>): T {
    return factoryProvider.useFactory();
  }

  // 用于获取类构造函数中声明的依赖对象 重点&难点
  private getInjectedParams<T>(target: Type<T>) {
    // 获取参数的类型 "design:paramtypes" 用于修饰目标对象方法的参数类型
    const argTypes = Reflect.getMetadata(REFLECT_PARAMS, target) as (InjectableParam | undefined)[];
    if(argTypes === undefined) {
      return [];
    }
    return argTypes.map((argTypes, index) => {
      if(argTypes === undefined) {
        throw new Error (
          `Injection error. Recursive dependency detected in constructor for type ${target.name} with parameter at index ${index}`
        );
      }
      const overrideToken = getInjectionToken(target, index);
      const actualToken = overrideToken === undefined ? argTypes : overrideToken;
      let provider = this.providers.get(actualToken);
      // 递归调用 一层接一层
      return this.injectWithProvider(actualToken, provider);
    });
  }

}

