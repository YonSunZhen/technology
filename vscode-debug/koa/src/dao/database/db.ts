import { service_logger } from '@common';
import Knex from 'knex';
import config from 'config';

export const db = Knex({
  debug: true,
  client: 'mysql',
  connection: config.get('db'),
  pool: { min: 0, max: 10 },
  acquireConnectionTimeout: 10000,

  log: {
    debug: (msg: any) => service_logger.debug(msg),
    warn: (msg: any) => service_logger.warn(msg),
    error: (msg: any) => service_logger.error(msg)
  }
});