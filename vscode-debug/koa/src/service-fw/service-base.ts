import { ServiceParams } from './service-params';
import { logger } from './logger/logger';

import Koa from 'koa';
import onerror from 'koa-onerror';

import { middleware } from './middleware';


export class ServiceBase extends Koa {
  private _logger;

  constructor(
    private conf: ServiceParams,
    private port: number) {
    super();
    this._exec();
  }

  private _exec() {
    this._logger = logger(this.conf.name);
    this.conf.hooks.init();

    this._enableErrorHandling();

    this.use(middleware(this.conf));

    const server = super.listen(this.port);

    server.on('listening', () => {
      const addr = server.address();
      const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;

      this._logger.info(`Listening on ${bind}`);

      this.conf.hooks.ready();
    });

    server.once('close', () => {
      this.conf.hooks.destroy();
    });
  }


  private _enableErrorHandling() {
    /**
    * 由于 Koa extends EventEmitter,因此这里监听全局EventEmitter的error事件,
    * 可以通过ctx.app.emit('error', err)触发事件
    */
    this.on('error', (err) => {
      if (!err.expose) {
        this._logger.info(`error: ${err.message} \n stack: ${err.stack} \n`);
      }
    });

    // 捕获未被处理的promise rejection
    process.on('unhandledRejection', (err) => {
      this._logger.info(`unhandledRejection: ${err['message']}, stack: ${err['stack']}`);
    });

    // 捕获未被处理的异常
    process.on('uncaughtException', (err) => {
      this._logger.info(`uncaughtException: ${err.message}, stack: ${err.stack}`);
    });

    /**
     * 由于原生的koa的context.onerror不够全面,
     * 因此这里重写context.onerror
     */
    onerror(this);
  }
}
