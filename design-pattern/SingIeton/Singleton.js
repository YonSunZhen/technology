// 保证一个特定类仅有一个实例，意味着当你第二次使用同一个类创建对象时，应得到和第一个对象完全相同

//方法一,缺点instance暴露了
function Universe1(){
	if(typeof Universe1.instance === "object"){
		return Universe1.instance;//防止被篡改
	}
	this.name = "syz";
	Universe1.instance=this;
	return this;
}
var uni1 = new Universe1();
var uni2 = new Universe1();
console.log(uni1);

//使用闭包,问题原型对象没继承
function Universe2(){
	var instance = this;//缓存this
	this.name="syz";
	Universe2=function(){//重写此构造函数
		return instance;
	}
}
var uni3 = new Universe2();
var uni4 = new Universe2();
console.log(uni3);

//方法3 容易理解
var Universe3;
(function(){
	var instance;
	Universe3 = function(){
		if(instance){
			return instance;
		}
		instance = this;
		this.name = "syz";
	}
})();
var uni5 = new Universe3();
Universe3.prototype.a = 1;
var uni6 = new Universe3();
console.log(uni5 === uni6);
console.log(uni5.a);