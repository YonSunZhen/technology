var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    console.log('这里是调试1');
    var c = arguments.length;
    console.log(c);
    // 该方法所属类的原型对象 || 目标方法的属性描述符 (属性描述符)
    var r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    var d;
    // 检测是否已经支持新特性了 该新特性是能够支持JS元数据反射的API
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        console.log('这里是调试3');
        r = Reflect.decorate(decorators, target, key, desc);
    }else {
        for (var i = decorators.length - 1; i >= 0; i--) {
            if (d = decorators[i]){
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
                console.log('这里是调试2');
                console.log(r);
            } 
        };
    } 
    console.log('这里是调试4');
    console.log(c > 3 && r && Object.defineProperty(target, key, r));
    console.log(r);
    console.log('这里是调试5');
    console.log(target);
    console.log(key);
    console.log(r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function methodDeractor (msg) {
    return function (target, name, descriptor) {
        let oMethod = descriptor.value;
        descriptor.value = function () { 
            oMethod.apply(this);
            console.log(msg); 
        };
    };
}
var Person = /** @class */ (function () {
    function Person () {
    }
    Person.prototype.sayHello = function () {
        console.log("hello");
    };
    // 重写sayHello这个方法
    __decorate([
        methodDeractor("hello world")
    ], Person.prototype, "sayHello", null);
    return Person;
}());
var a = new Person();
a.sayHello(); //hello world
