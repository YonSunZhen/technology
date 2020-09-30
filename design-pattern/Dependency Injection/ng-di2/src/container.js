"use strict";
// http://www.semlinker.com/ioc-and-di/#%E5%85%AD%E3%80%81%E6%89%8B%E5%86%99-IoC-%E5%AE%B9%E5%99%A8
exports.__esModule = true;
exports.Container = void 0;
var provider_1 = require("./provider");
var Injectable_1 = require("./Injectable");
var Inject_1 = require("./Inject");
var REFLECT_PARAMS = 'design:paramtypes';
var Container = /** @class */ (function () {
    function Container() {
        this.providers = new Map();
    }
    Container.prototype.addProvider = function (provider) {
        this.assertInjectableIfClassProvider(provider);
        // 重复注入同个类的话 貌似是以后面的为准???
        this.providers.set(provider.provide, provider);
    };
    Container.prototype.inject = function (type) {
        var provider = this.providers.get(type);
        // 忘记将Class执行addProvider
        if (provider === undefined && !(type instanceof provider_1.InjectionToken)) {
            provider = { provide: type, useClass: type };
            this.assertInjectableIfClassProvider(provider);
        }
        return this.injectWithProvider(type, provider);
    };
    Container.prototype.assertInjectableIfClassProvider = function (provider) {
        if (provider_1.isClassProvider(provider) && !Injectable_1.isInjectable(provider.useClass)) {
            throw new Error("Cannot provide " + this.getTokenName(provider.provide) + " using class " + this.getTokenName(provider.useClass) + ", \n        " + this.getTokenName(provider.useClass) + " isn't injectable");
        }
    };
    Container.prototype.getTokenName = function (token) {
        return token instanceof provider_1.InjectionToken ? token.injectionIdentifier : token.name;
    };
    Container.prototype.injectWithProvider = function (type, provider) {
        if (provider === undefined) {
            throw new Error("No provider for type " + this.getTokenName(type));
        }
        if (provider_1.isClassProvider(provider)) {
            return this.injectClass(provider);
        }
        else if (provider_1.isValueProvider(provider)) {
            return this.injectValue(provider);
        }
        else {
            return this.injectFactory(provider);
        }
    };
    // 关键 在实例化服务类时 需要构造该服务类依赖的独享(即在构造函数中注入的依赖)
    Container.prototype.injectClass = function (classProvider) {
        var target = classProvider.useClass;
        var params = this.getInjectedParams(target);
        // ??? 这里的作用
        return Reflect.construct(target, params);
    };
    Container.prototype.injectValue = function (valueProvider) {
        return valueProvider.useValue;
    };
    Container.prototype.injectFactory = function (factoryProvider) {
        return factoryProvider.useFactory();
    };
    // 用于获取类构造函数中声明的依赖对象
    Container.prototype.getInjectedParams = function (target) {
        var _this = this;
        // 获取参数的类型
        var argTypes = Reflect.getMetadata(REFLECT_PARAMS, target);
        if (argTypes === undefined) {
            return [];
        }
        return argTypes.map(function (argTypes, index) {
            if (argTypes === undefined) {
                throw new Error("Injection error. Recursive dependency detected in constructor for type " + target.name + " with parameter at index " + index);
            }
            var overrideToken = Inject_1.getInjectionToken(target, index);
            var actualToken = overrideToken === undefined ? argTypes : overrideToken;
            var provider = _this.providers.get(actualToken);
            // 递归调用 一层接一层
            return _this.injectWithProvider(actualToken, provider);
        });
    };
    return Container;
}());
exports.Container = Container;
