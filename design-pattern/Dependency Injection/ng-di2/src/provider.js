"use strict";
exports.__esModule = true;
exports.isFactoryProvider = exports.isValueProvider = exports.isClassProvider = exports.InjectionToken = void 0;
// 唯一标志
var InjectionToken = /** @class */ (function () {
    function InjectionToken(injectionIdentifier) {
        this.injectionIdentifier = injectionIdentifier;
    }
    return InjectionToken;
}());
exports.InjectionToken = InjectionToken;
// is 缩小类型 判断是否属于某种类型
function isClassProvider(provider) {
    return provider.useClass !== undefined;
}
exports.isClassProvider = isClassProvider;
function isValueProvider(provider) {
    return provider.useValue !== undefined;
}
exports.isValueProvider = isValueProvider;
function isFactoryProvider(provider) {
    return provider.useFactory !== undefined;
}
exports.isFactoryProvider = isFactoryProvider;
