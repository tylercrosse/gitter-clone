import winston from 'winston';
import config  from 'winston/lib/winston/config';
import moment  from 'moment';

const getTS = () => (moment().format('MMM-D-YYYY HH:mm:ss.SSS'));

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      name: 'general-logger',
      level: 'debug',
      timestamp() { return getTS(); },
      formatter(options) {
        return config.colorize(options.level, '[' + options.timestamp() + '] [' + options.level.toUpperCase() + '] ') + (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta, null, 2) : '');
      }
    })
  ]
});

export const reqLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      name: 'req-logger',
      timestamp() { return getTS(); },
      colorize: true,
      msg: 'HTTP {{req.method}} {{req.url}} pizza',
      // json: true
      formatter(options) {
        return config.colorize(options.level, '[' + options.timestamp() + '] [' + options.level.toUpperCase() + '] ') + (options.message ? options.message : '');
      }
    })
  ]
});

export const errLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      name: 'error-logger',
      timestamp() { return getTS(); },
      formatter(options) {
        return config.colorize(options.level, '[' + options.timestamp() + '] [' + options.level.toUpperCase() + '] ') + (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta, null, 2) : '');
      }
    })
  ]
});

export default logger;
