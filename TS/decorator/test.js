var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function logProperty1(params) {
    // target--->类的原型对象；attr--->装饰的属性名
    return function (target, attr) {
        target[attr] = params;
    };
}
var HttpClient1 = /** @class */ (function () {
    function HttpClient1() {
        this.url;
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
