import { ServiceParams } from './service-params';
import { ServiceBase } from './service-base';
import { logger } from './logger/logger';

function _fillServiceParams(params: ServiceParams): ServiceParams {
  const _logger = logger(params.name);

  if (params.production === undefined) {
    params.production = (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') ? true  : false;
  }

  if (!params.hooks) {
    params.hooks = {
      init: () => { _logger.info('init ...'); },
      ready: () => { _logger.info('ready ...'); },
      destroy: () => { _logger.info('destroy ...'); }
    };
  } else {
    if (!params.hooks.init) {
      params.hooks.init = () => { _logger.info('init ...'); };
    }

    if (!params.hooks.ready) {
      params.hooks.ready = () => { _logger.info('ready ...'); };
    }

    if (!params.hooks.destroy) {
      params.hooks.destroy = () => { _logger.info('destroy ...'); };
    }
  }
  return params;
}

export function Service(params: ServiceParams, port = 8080): void {
  const _params = _fillServiceParams(params);
  const _logger = logger(params.name);
  new ServiceBase(_params, port);

  process.on('SIGINT', (sig) => {
    _logger.info(`${sig} ...`);
    if (params.hooks.destroy) {
      params.hooks.destroy();
    }
    process.exit(0);
  });
}
