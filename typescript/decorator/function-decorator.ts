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


function autoLog (func: any) {
  return function () {
    console.log(`start ${func.name}`)
    func()
    console.log(`end ${func.name}`)
  }
}
function doSomething1 () {
  console.log('这里是调试1');
}

function doSomething2 () {
  console.log('这里是调试2');
}

autoLog(doSomething1)();
