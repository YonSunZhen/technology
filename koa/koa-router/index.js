const methods = [
  'GET',
  'PUT',
  'PATCH',
  'POST',
  'DELETE'
];

class Layer {
  constructor(path, methods, middleware, opts) {
    this.path = path;
    this.methods = methods;
    this.middleware = middleware;
    this.opts = opts;
  }
}

class Router {
  constructor(opts = {}) {
    // 存放各个注册路由的信息
    this.stack = [];
  }

  register(path, methods, middleware, opts) {
    let route = new Layer(path, methods, middleware, opts);
    this.stack.push(route);
    return this;
  }

  routes() {
    let stock = this.stack;
    return async function(ctx, next) {
      let currentPath = ctx.path;
      let route;
      for(let i = 0; i < stock.length; i++) {
        let item = stock[i];
        if(currentPath === item.path && item.methods.indexOf(ctx.method) >= 0) {
          route = item.middleware;
          break;
        }
      }

      if(typeof route === 'function') {
        // 触发接口业务逻辑执行
        route(ctx, next);
        return;
      }
      await next();
    };
  }
}

// 将各个http请求方法注册到Router类
methods.forEach(method => {
  Router.prototype[method.toLocaleLowerCase()] = Router.prototype[method] = function(path, middleware) {
    this.register(path, [method], middleware);
  };
});

module.exports = Router;