var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Somebody = /** @class */ (function () {
    function Somebody(name) {
        this.speed = 10;
        this.name = name;
    }
    Somebody.prototype.hit = function (rival) {
        var hitDamage = 10;
        console.log(this.name + "\u5BF9" + rival.name + "\u9020\u6210\u4E00\u6B21\u4F24\u5BB3\uFF1A" + hitDamage);
    };
    return Somebody;
}());
function cheating(target) {
    target.prototype.hit = function (rival) {
        var hitDamage = 100;
        console.log(this.name + "\u5BF9" + rival.name + "\u9020\u6210\u4E00\u6B21\u4F24\u5BB3: " + hitDamage);
    };
}
var SBody = /** @class */ (function (_super) {
    __extends(SBody, _super);
    function SBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SBody = __decorate([
        cheating
    ], SBody);
    return SBody;
}(Somebody));
var s0 = new Somebody('小红0');
var s1 = new SBody('小红1');
var rival = new Somebody('小明');
s0.hit(rival);
s1.hit(rival);
