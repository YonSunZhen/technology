import * as mysql from 'mysql';
import { logger } from '../logger/logger';
import { ResponseUtils } from './response-utils';
import { isNullOrUndefined, promisify } from 'util';

const _logger = logger();

export class MySqlWrapper {
  private _poolConfig: mysql.PoolConfig = {};
  private _pool: mysql.Pool;
  constructor(poolConfig: mysql.PoolConfig) {
    Object.assign(this._poolConfig, poolConfig);
    if (isNullOrUndefined(this._poolConfig.connectionLimit)) {
      this._poolConfig.connectionLimit = 10;
    }

    if (isNullOrUndefined(this._poolConfig.dateStrings)) {
      this._poolConfig.dateStrings = true;
    }
    this._connect();
  }

  private _connect() {
    this._pool = mysql.createPool(this._poolConfig);
    this._pool.on('error', (err: mysql.MysqlError) => {
      _logger.error(err);
      _logger.info('trying reconnect ...');
      this._pool.end();
      this._connect();
    });

    this._pool.on('enqueue', function () {
      _logger.info('Waiting for available connection slot');
    });
  }

  async exec(sql: string, params: any) {
    let _res;
    try {
      _res = await promisify<string, any, any>(this._pool.query)(sql, params);
    } catch (err) {
      _logger.error(err);
      ResponseUtils.throwError(100100);
    }
    return _res;
  }

  async query(sql: string, params: any) {
    const _res = await this.exec(sql, params);
    if (_res.length >= 1) {
      return _res;
    }
    // 这里等于空时，不直接返回error的数据结构，因为等于空时不一定代表错误，因此把为空的错误逻辑交给调用者进行处理
    return '';
  }

  async insert(sql: string, params: any) {
    return this.exec(sql, params);
  }

  async update(sql: string, params: any) {
    return this.exec(sql, params);
  }

  async delete(sql: string, params: any) {
    return this.exec(sql, params);
  }
}
