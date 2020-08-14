function methodDeractor(msg:string):Function{
  return function(target:any, name:string, descriptor:PropertyDescriptor){
    let oMethod = descriptor.value;
    descriptor.value = () => {
      oMethod.apply(this);
      console.log(msg)
    }
  }
}

class Person{

  @methodDeractor("hello world")
  sayHello(){
      console.log("hello");
  }
}

let a = new Person();
a.sayHello(); //hello hello world