import { Context } from 'koa';

export function koaError(production = true){
  return async (ctx: Context, next) => {
    try {
      await next();
    } catch (_err) {
      const err = _err || new Error('Null or undefined error');
      ctx.app.emit('error', err, ctx);
      ctx.set('Cache-Control', 'no-cache, max-age=0');
      ctx.status = err.status || 500;
      ctx.type = 'application/json';
      const resp = err.response || {};
      ctx.body = {
        code: err.code,
        error: resp.body || err.error,
        message: err.message,
      };

      if (!production) {
        ctx.body.stack = err.stack;
      }
    }
  };
}
