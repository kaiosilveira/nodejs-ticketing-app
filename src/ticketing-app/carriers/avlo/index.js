import winston from 'winston';
import search from './search';

const logger = winston.createLogger({
  level: 'silly',
  defaultMeta: { carrier: 'avlo', pid: process.pid },
  transports: [new winston.transports.Console()],
});

export default {
  name: 'avlo',
  logger,
  search: env => search({ ...env, logger }),
};
