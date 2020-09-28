import 'reflect-metadata';

const DI_IMPORTS_SYMBOL = Symbol('di:import');
const DI_PROVIDERS_SYMBOL = Symbol('di:providers');

function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('design:paramtypes', Reflect.getMetadata('design:paramtypes', target) || [], target);
  };
}

function Module(options: { import?: Array<any>, providers?: Array<any> }): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(DI_PROVIDERS_SYMBOL, new Set(options.import || []), target);
    Reflect.defineMetadata(DI_PROVIDERS_SYMBOL, new Set(options.providers || []), target);
  }
}

// namespace Facrory {
//   function create(module) {
//     const 
//   }
// }

