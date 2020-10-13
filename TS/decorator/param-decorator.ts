// 参数装饰器 接受3个参数
// target: Object —— 被装饰的参数所在的方法的类
// methodName: string | symbol —— 方法名
// paramsIndex: number —— 方法中参数的索引值
// 在构造器中的参数使用
function logParams(params: any) {
  return function (target: any, methodName: any, paramsIndex: any) {
    console.log(1, params);
    console.log(2, target);
    console.log(3, methodName);
    console.log(4, paramsIndex);
  }
}

class HttpClient {
  public url: any | undefined;
  constructor() {

  }

  getData(@logParams('uuid') uuid: any) {
    console.log(uuid);
  }
}

let http = new HttpClient();

http.getData(123456);

// 1 uuid
// 2 HttpClient {}
// 3 getData
// 4 0
// 123456