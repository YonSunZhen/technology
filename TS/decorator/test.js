// 属性装饰器
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function logProperty(params) {
    // target--->类的原型对象；attr--->装饰的属性名
    return function (target, attr) {
        target[attr] = params;
    };
}
// class HttpClient1 {
//   @logProperty('http://www.baidu1.com')
//   static url: any | undefined;
//   constructor() {
//   }
//   getUrl() {
//     console.log(HttpClient1.url);
//   }
// }
var HttpClient2 = /** @class */ (function () {
    function HttpClient2() {
    }
    HttpClient2.prototype.getUrl = function () {
        console.log(HttpClient2.url);
    };
    HttpClient2.url = 'http://www.baidu2.com';
    __decorate([
        logProperty('http://www.baidu22.com')
    ], HttpClient2, "url");
    return HttpClient2;
}());
// console.log(HttpClient1.url);
console.log(HttpClient2.url);
