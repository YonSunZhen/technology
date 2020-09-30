"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var container_1 = require("./container");
var Injectable_1 = require("./Injectable");
var provider_1 = require("./provider");
var API_URL = new provider_1.InjectionToken('apiUrl');
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function () {
        console.log('get');
    };
    HttpClient = __decorate([
        Injectable_1.Injectable()
    ], HttpClient);
    return HttpClient;
}());
var HttpService = /** @class */ (function () {
    function HttpService(httpClient, apiUrl) {
        this.httpClient = httpClient;
        this.apiUrl = apiUrl;
    }
    HttpService.prototype.test = function () {
        console.log(this.apiUrl);
        this.httpClient.get();
    };
    HttpService = __decorate([
        Injectable_1.Injectable()
    ], HttpService);
    return HttpService;
}());
var container = new container_1.Container();
// addProvider 这一步就相当于angular中在module中的providers添加Service
container.addProvider({
    provide: API_URL,
    useValue: 'https://www.666.com/'
});
container.addProvider({ provide: HttpService, useClass: HttpService });
container.addProvider({ provide: HttpClient, useClass: HttpClient });
var httpService = container.inject(HttpService);
httpService.test();
