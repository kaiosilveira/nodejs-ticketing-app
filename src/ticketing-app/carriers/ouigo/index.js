import winston from 'winston';
import search from './search';

const logger = winston.createLogger({
  level: 'silly',
  defaultMeta: { carrier: 'ouigo', pid: process.pid },
  transports: [new winston.transports.Console()],
});

export default {
  name: 'ouigo',
  logger,
  search: env => search({ ...env, logger }),
};
