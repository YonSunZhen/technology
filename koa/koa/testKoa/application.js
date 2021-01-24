let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');

class Application {
  /**
   * 构造函数
   */
  constructor() {
    // this.callbackFunc;
    this.middlewares = [];
    this.context = context;
    this.request = request;
    this.response = response;
  }

  /**
   * 开启http server并传入callback
   */
  listen(...args) {
    let server = http.createServer(this.callback());
    server.listen(...args);
  }

  /**
   * 挂载回调函数
   * @param {Function} fn 回调处理函数
   */
  use(middleware) {
    // this.callbackFunc = fn;
    this.middlewares.push(middleware);
  }

  compose() {
    // 将middlewares合并为一个函数,该函数接受一个ctx对象
    return async (ctx) => {
      function createNext(middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext);
        }
      }
      
      let len = this.middlewares.length;
      // 定义一个默认函数
      let next = async() => {
        return Promise.resolve();
      };

      /**
       * 第一次运行:
       * next = 
       * function(){
       *  fn3(ctx,old);
       * }
       * 
       * 第二次运行:
       * next = 
       * function(){
       *  old=fn3
       *  fn2(ctx,old);
       * }
       * 
       * 第三次运行:
       * next = 
       * function(){
       *  old=fn2
       *  fn1(ctx,old)
       * }
       *
       * function(){
       *  const fun3 = async () => {
       *    fn3(ctx);
       *  }
       *  const fun2 = async () => {
       * 
       *    fn2(ctx,fun3);
       *  }
       *  const fun1 = async ()=>{
       *    fn1(ctx,fun2);
       *  }
       * } 
       */
      for(let i = len - 1; i >= 0; i--) {
        next = createNext(this.middlewares[i], next);
      }
      await next();
    };
  }

  /**
   * 获取http server所需要的callback函数
   * @return {Function} fn
   */
  callback() {
    return (req, res) => {
      let ctx = this.createContext(req, res);
      let respond = () => this.responseBody(ctx);
      // this.callbackFunc(ctx).then(respond);
      let fn = this.compose();
      return fn(ctx).then(respond);
    };
  }

  /**
   * 构造ctx
   * @param {Object} req node req实例
   * @param {Object} res node res实例
   * @return {Object} ctx实例
   */
  createContext(req, res) {
    // Object.create 方法创建一个新对象，使用现有的对象来提供新创建的对象的proto
    let ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  /**
   * 对客户端消息进行回复
   * @param {Object} ctx ctx实例 
   */
  responseBody(ctx) {
    let content = ctx.body;
    if(typeof content === 'string') {
      ctx.res.end(content);
    } else if(typeof content === 'object') {
      ctx.res.end(JSON.stringify(content));
    }
  }
}

module.exports = Application;