import { 
  Token, Provider,
  isClassProvider, InjectionToken, isValueProvider,
  ClassProvider, ValueProvider, FactoryProvider
} from './provider';
import { isInjectable } from './Injectable';


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
    
  }

  private assertInjectableIfClassProvider<T>(provider: Provider<T>) {
    if(isClassProvider(provider) && !isInjectable(provider.useClass)) {
      throw new Error(
        `Cannot provide ${this.getTokenName(
          provider.provide
     )} using class ${this.getTokenName(
          provider.useClass
     )}, ${this.getTokenName(provider.useClass)} isn't injectable`
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
    return classProvider.useClass();
  }

  private injectValue<T>(valueProvider: ValueProvider<T>): T {
    return valueProvider.useValue;
  }

  private injectFactory<T>(factoryProvider: FactoryProvider<T>): T {
    return factoryProvider.useFactory();
  }

}

