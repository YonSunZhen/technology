//定义一个Class并在其add上使用了修饰器
class Math1 {
  test = false;
  @log
  add(a: any, b: any) {
    return a + b;
  }
}

//定义一个修饰器
function log(target: any, name: any, descriptor: any) {
  //这里是缓存旧的方法，也就是上面那个add()原始方法
  var oldValue = descriptor.value;

  //这里修改了方法，使其作用变成一个打印函数
  //最后依旧返回旧的方法，真是巧妙
  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments);
    return oldValue.apply(null, arguments);
  };

  return descriptor;
}

const math = new Math1();
math.add(2, 4); // 先是打印了Calling add with [2,4],后返回了[2,4]