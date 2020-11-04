"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
require("reflect-metadata");
// injectable 类装饰器
var injectableKey = 'isInjectable';
function Injectable() {
    return function (target) {
        Reflect.defineMetadata(injectableKey, true, target);
    };
}
function isInjectable(target) {
    var res = Reflect.getMetadata(injectableKey, HttpClient);
    return !(res === undefined);
}
// inject 属性装饰器
function Inject() {
}
// 一些辅助方法
// container 注入器类
var Container = /** @class */ (function () {
    function Container() {
        this.providers = new Map();
    }
    Container.prototype.addProvider = function (data) {
        this.providers.set(data.provider, data);
    };
    Container.prototype.inject = function (data) {
        var provider = this.providers.get(data);
        console.log('这里是调试2');
        console.log(provider);
        var value = provider.value;
        // 获取value类的构造函数属性值
        var haha = Reflect.getMetadata('design:paramtypes', value);
        console.log('这里是调试3');
        console.log(haha);
    };
    return Container;
}());
var container = new Container();
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function () {
        console.log('get');
    };
    HttpClient = __decorate([
        Injectable()
    ], HttpClient);
    return HttpClient;
}());
var HttpService = /** @class */ (function () {
    function HttpService(
    // 使用这种方式是如何将HttpClient注入的 使用Reflect.getMetadata('design:paramtypes', target)获取target类的参数类型信息
    httpClient, haha) {
        this.httpClient = httpClient;
        this.haha = haha;
    }
    HttpService.prototype.test = function () {
        // console.log(this.apiUrl);
        this.httpClient.get();
    };
    HttpService = __decorate([
        Injectable()
    ], HttpService);
    return HttpService;
}());
container.addProvider({ provider: HttpClient, value: HttpClient });
container.addProvider({ provider: HttpService, value: HttpService });
container.inject(HttpService);
console.log('这里是调试1');
var test = isInjectable(HttpClient);
console.log(test);
