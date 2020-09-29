import 'reflect-metadata';

const DI_IMPORTS_SYMBOL = Symbol('di:import');
const DI_PROVIDERS_SYMBOL = Symbol('di:providers');


// 根注入容器 用于存放各个实例
const moduleInstances: Map<any, any> = new Map();

export function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('design:paramtypes', Reflect.getMetadata('design:paramtypes', target) || [], target);
  };
}

export function Module(options: { imports?: Array<any>, providers?: Array<any> }): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(DI_IMPORTS_SYMBOL, new Set(options.imports || []), target);
    Reflect.defineMetadata(DI_PROVIDERS_SYMBOL, new Set(options.providers || []), target);
  }
}

export namespace Factory {
  export function create(module: Function) {
    const imports: Set<Function> = Reflect.getMetadata(DI_IMPORTS_SYMBOL, module);
    const providers: Set<Function> = Reflect.getMetadata(DI_PROVIDERS_SYMBOL, module);
    const importsArr = Array.from(imports);
    importsArr.forEach(i => {
      let _moduleInstance = moduleInstances.get(i.name);
      if(!_moduleInstance) {
        moduleInstances.set(i.name, i);
      }
    })
  }
}

export class ModuleInstance {

  constructor(
    public imports: Array<ModuleInstance>,
    public providers: Map<any, any>
  ) { }



}

