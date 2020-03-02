function Observer() {
    this.fns = [];
}

Observer.prototype = {
    subscribe: function (fn) {
        this.fns.push(fn);
    },
    unsubscribe: function (fn) {
        //filter对数组中的每个函数都执行一次指定的函数，并且创建一个新的数组，该数组元素是所有回调函数执行时返回值为true的原数组（过滤）
        this.fns = this.fns.filter(
            function (el) {
                // if (el !== fn) {
                //     return el;
                // }
                // 去掉取消订阅的那一个
                return (el !== fn);
            }
        );
        console.log(this.fns);
    },
    update: function (o,thisObj) {
        var scope = thisObj || window;
        //遍历数组fns中的每个数组(函数)
        this.fns.forEach(
            function (el) {
                //执行函数
                el.call(scope, o);
            }
        );
        console.log(this.fns);
    }
};

var o = new Observer;
//f1是一个函数
var f1 = function (data) {
    console.log('Robbin:' + data + ',赶紧干活了!');
};
//f2是一个函数
var f2 = function (data) {
    console.log('Randall:' + data + ',找他加点工资!');
}
//订阅(观察者)
o.subscribe(f1);
o.subscribe(f2);
//发布
o.update("Tom回来了");

//退订f1
o.unsubscribe(f1);
//再来验证
o.update("Tom回来了");
