const passcode = "secret passcode";  
class Student {
  private _fullName: string;
  // get中必须有return 不然报错 
  get fullName() {
    // return的值类型必须与set中参数类型一致 不然报错
    // 获取这个属性将进入这里 这里面可以添加判断业务逻辑 
    return this._fullName;
  }

  // 有且仅有一个参数
  set fullName(newName: string) {
    // 为属性赋值将进入这里 这里面也可以添加业务逻辑
    if(passcode && passcode === "secret passcode") {
      this._fullName = newName;
    } else {
      console.log("未经授权更新学生详细资料!");
    }
  }
}
let stud = new Student();
stud.fullName = "syz";
console.log(stud.fullName);
