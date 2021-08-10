import { Service, ResponseUtils, logger } from '@service-fw';
import { router } from './router';
import { errorMessages } from '@common';
import config from 'config';
import { initDb } from '@dao';

const _svc_conf = config.get<{ name: string; port: number }>('service');
const _logger = logger(_svc_conf.name);

ResponseUtils.registerErrorMessages(errorMessages);

Service({
  name: _svc_conf.name,
  router: router,
  hooks: {
    init: () => {
      _logger.info(config);
    },
    ready: async () => {
      await initDb();
      _logger.info('ready ...');
    },
    destroy: () => {
      _logger.info('destroy ...');
    }
  }
}, _svc_conf.port);
