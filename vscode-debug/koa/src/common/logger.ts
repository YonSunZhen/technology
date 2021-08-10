import { logger } from '@service-fw';
import config from 'config';

export const service_logger = logger(`${config.get('service.name')}`);