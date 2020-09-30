"use strict";
exports.__esModule = true;
exports.getInjectionToken = exports.Inject = void 0;
require("reflect-metadata");
var INJECT_METADATA_KEY = Symbol('INJECT_KEY');
// 参数装饰器 接受3个参数
// target: Object —— 被装饰的类
// propertyKey: string | symbol —— 方法名
// parameterIndex: number —— 方法中参数的索引值
// 在构造器中的参数使用
function Inject(token) {
    return function (target, _, index) {
        Reflect.defineMetadata(INJECT_METADATA_KEY, token, target, "index-" + index);
        return target;
    };
}
exports.Inject = Inject;
function getInjectionToken(target, index) {
    return Reflect.getMetadata(INJECT_METADATA_KEY, target, "index-" + index);
}
exports.getInjectionToken = getInjectionToken;
