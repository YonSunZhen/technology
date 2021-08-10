import * as log4js from 'log4js';
import log4js_extend  from 'log4js-extend';

/**
 * ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
 */
log4js.configure({
    appenders: {
        console: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: ['console'], level: 'info' }, // 只输出到控制台
    }
});

log4js_extend(log4js, {
    path: __dirname,
    format: 'at @name() (@file:@line)'
});

export function logger(category?: string): log4js.Logger {
    return log4js.getLogger(category);
}
