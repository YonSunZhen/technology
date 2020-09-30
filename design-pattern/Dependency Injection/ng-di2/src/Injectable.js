"use strict";
exports.__esModule = true;
exports.isInjectable = exports.Injectable = void 0;
require("reflect-metadata");
var INJECTABLE_METADATA_KEY = Symbol('INJECTABLE_KEY');
// 必须被这个装饰器修饰的Class才说明是可以被注入的 (表示Class自己承认是可被注入的)
function Injectable() {
    return function (target) {
        Reflect.defineMetadata(INJECTABLE_METADATA_KEY, true, target);
        return target;
    };
}
exports.Injectable = Injectable;
// 检查Class是否可被注入
function isInjectable(target) {
    return Reflect.getMetadata(INJECTABLE_METADATA_KEY, target) === true;
}
exports.isInjectable = isInjectable;
