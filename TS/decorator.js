// class Somebody {
//   speed: number = 10;
//   name: string;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//   constructor(name: string) {
//     this.name = name;
//   }
//   hit(rival: Somebody) {
//     const hitDamage: number = 10;
//     console.log(`${this.name}对${rival.name}造成一次伤害：${hitDamage}`);
//   }
// }
// function cheating(target: any) {
//   target.prototype.hit = function(rival: Somebody) {
//     const hitDamage: number = 100;
//     console.log(`${this.name}对${rival.name}造成一次伤害: ${hitDamage}`);
//   }
// }
// @cheating
// class SBody extends Somebody{
// }
// const s0 = new Somebody('小红0');
// const s1 = new SBody('小红1');
// const rival = new Somebody('小明');
// s0.hit(rival);
// s1.hit(rival);
// function autoLog (func) {
//   return function () {
//     console.log(`start ${func.name}`)
//     func()
//     console.log(`end ${func.name}`)
//   }
// }
// function doSomething1 () {
//   console.log('这里是调试1');
// }
// function doSomething2 () {
//   console.log('这里是调试2');
// }
// autoLog(doSomething1)();
function autoLog(target, propertyKey, descriptor) {
    var oldValue = descriptor.value;
    descriptor.value = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        // console.log(`start ${func.name}`)
        // 执行原方法
        oldValue.apply(this, rest);
        // console.log(`end ${func.name}`)
    };
}
var haha = /** @class */ (function () {
    function haha() {
    }
    haha.prototype.doSomeing1 = function () {
        // doSomeing1
        console.log('doSomeing1');
    };
    haha.prototype.doSomeing2 = function () {
        // doSomeing2
        console.log('doSomeing2');
    };
    __decorate([
        autoLog
    ], haha.prototype, "doSomeing1");
    __decorate([
        autoLog
    ], haha.prototype, "doSomeing2");
    return haha;
}());
var h = new haha();
h.doSomeing1();
