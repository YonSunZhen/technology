import 'reflect-metadata';
@Reflect.metadata('role', 'admin')
class Post {
  haha: {haha?: string; test?: number}
}
const metadata = Reflect.getMetadata('role', Post);
console.log(metadata);  // admin
// console.log(Reflect.getMetadata('design:paramtypes', Post));
Reflect.defineMetadata('design:paramtypes', [], Post);
console.log(Reflect.getMetadata('design:paramtypes', Post));

