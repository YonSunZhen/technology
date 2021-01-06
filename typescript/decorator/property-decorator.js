"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
// 属性装饰器
require("reflect-metadata");
// 用来记录某个属性的元数据
var formatMetadataKey = Symbol("format");
function format(formatString) {
    // Reflect.metadata返回一个函数 (target: Object, propertyKey: string | symbol): void
    return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target, propertyKey) {
    // 获取类中propertyKey的某个元数据(批注)
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        var formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    };
    __decorate([
        format("Hello, %s")
    ], Greeter.prototype, "greeting");
    return Greeter;
}());
var test = new Greeter('syz').greet();
console.log(test); // Hello, syz
require("reflect-metadata");
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        Reflect.metadata('role', 'admin')
    ], Post.prototype, "haha");
    return Post;
}());
var metadata = Reflect.getMetadata('role', Post.prototype, 'haha');
console.log(metadata); // admin
// 属性装饰器表达式在运行时当作函数被调用，传入下列2个参数
// 1、对于静态成员来说是某个类，因为静态成员是类中固定的变量，不同的实例共享同一块静态成员内存(类名.xxx)
// 对于实例成员是类的原型对象(原型链 用于类内部取值用 若类内部有值则优先用内部的值 否则去原型链上找 this.xxxx)
// 2、成员的名字
function logProperty1(params) {
    // target--->类的原型对象；attr--->装饰的属性名
    return function (target, attr) {
        target[attr] = params;
    };
}
var HttpClient1 = /** @class */ (function () {
    function HttpClient1() {
    }
    HttpClient1.prototype.getUrl = function () {
        console.log(this.url);
    };
    __decorate([
        logProperty1('http://www.baidu1.com')
    ], HttpClient1.prototype, "url");
    return HttpClient1;
}());
var HttpClient2 = /** @class */ (function () {
    function HttpClient2() {
        this.url = 'http://www.baidu2.com';
    }
    HttpClient2.prototype.getUrl = function () {
        console.log(this.url);
    };
    __decorate([
        logProperty1('http://www.baidu22.com')
    ], HttpClient2.prototype, "url");
    return HttpClient2;
}());
var http1 = new HttpClient1();
http1.getUrl(); // http://www.baidu1.com
var http2 = new HttpClient2();
http2.getUrl(); // http://www.baidu2.com
function logProperty2(params) {
    // target--->类；attr--->装饰的属性名
    return function (target, attr) {
        target[attr] = params;
    };
}
var HttpClient3 = /** @class */ (function () {
    function HttpClient3() {
    }
    HttpClient3.prototype.getUrl = function () {
        console.log(HttpClient3.url);
    };
    __decorate([
        logProperty2('http://www.baidu1.com')
    ], HttpClient3, "url");
    return HttpClient3;
}());
var HttpClient4 = /** @class */ (function () {
    function HttpClient4() {
    }
    HttpClient4.prototype.getUrl = function () {
        console.log(HttpClient4.url);
    };
    HttpClient4.url = 'http://www.baidu2.com';
    __decorate([
        logProperty2('http://www.baidu22.com')
    ], HttpClient4, "url");
    return HttpClient4;
}());
console.log(HttpClient3.url); // http://www.baidu1.com
console.log(HttpClient4.url); // http://www.baidu22.com
