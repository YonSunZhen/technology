import 'reflect-metadata';
// injectable 类装饰器
const INJECT_METADATA_KEY = Symbol('INJECT_KEY');
function Injectable() {
  return function(target: any) {
    Reflect.defineMetadata(INJECT_METADATA_KEY, true, target);
  }
}

function isInjectable(target: any) {
  const res = Reflect.getMetadata(INJECT_METADATA_KEY, HttpClient);
  return !(res === undefined);
}

// inject 属性装饰器
function Inject() {

}


// 一些辅助方法
interface Type<T> extends Function {
  new (...args: any[]): T;
}
class InjectionToken {
  constructor(public injectionIdentifier: string) {

  }
}
type Token<T> =  Type<T> | InjectionToken;

interface BaseProvider<T> {
  provider: Token<T>
}
interface ClassProvider<T> extends BaseProvider<T> {
  useClass: T
}
interface ValueProvider<T> extends BaseProvider<T> {
  useValue: T
}
type Provider<T> = ClassProvider<T> | ValueProvider<T>;

function isClassProvider<T>(provider: BaseProvider<T>): provider is ClassProvider<T> {
  return (provider as any).useClass === !undefined;
}

function isValueProvider<T>(provider: BaseProvider<T>): provider is ValueProvider<T> {
  return (provider as any).useValue === !undefined;
}

// container 注入器类
class Container {

  providers = new Map<Token<any>, Provider<any>>();

  addProvider<T>(data: Provider<T>) {
    this.assertInjectableIfClassProvider(data);
    this.providers.set(data.provider, data);
  }

  inject<T>(type: Token<T>) {
    const provider = this.providers.get(type);
    if(!provider) {
      this.assertInjectableIfClassProvider({provider: type, useClass: null})
    }
    this.injectWithProvider(type, provider);
    // console.log('这里是调试2');
    // console.log(provider);
    // const value = provider.provider;
    // // 获取value类的构造函数属性值
    // const params: any[] = [];
    // const paramArr = Reflect.getMetadata('design:paramtypes', value);
    // console.log('这里是调试3');
    // console.log(paramArr);
    // paramArr.forEach((p: any) => {
    //   const _provider = this.providers.get(p);
    //   if(_provider) {
    //     const _value = _provider.provider;
    //     params.push(Reflect.construct(_value, []));
    //     const _paramArr = Reflect.getMetadata('design:paramtypes', _value);
    //     console.log('这里是调试4');
    //     console.log(_paramArr);
        
    //   }
    // });
    // return Reflect.construct(type, params);
  }

  assertInjectableIfClassProvider<T>(provider: Provider<T>) {
    if(isClassProvider(provider) && !isInjectable(provider.provider)) {
      throw new Error('类没有添加Injectable类装饰器');
    }
  }

  injectWithProvider<T>(type: Token<T>, provider: Provider<T>) {

  }
}

const container = new Container();

@Injectable()
class HttpClient{
  get() {
    console.log('get');
  }
}

@Injectable()
class HttpService {
  constructor(
    // 使用这种方式是如何将HttpClient注入的 使用Reflect.getMetadata('design:paramtypes', target)获取target类的参数类型信息
    private httpClient: HttpClient,
    private haha: string
  ) { }
  test() {
    // console.log(this.apiUrl);
    this.httpClient.get();
  }
}

container.addProvider({provider: HttpClient, useClass: HttpClient});
container.addProvider({provider: HttpService, useClass: HttpService});

const test = container.inject(HttpService);

console.log('这里是调试1');
// const test = isInjectable(HttpClient);
console.log(test);
test.test();
