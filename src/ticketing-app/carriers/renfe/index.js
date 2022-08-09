import winston from 'winston';
import search from './search';

const logger = winston.createLogger({
  level: 'silly',
  defaultMeta: { carrier: 'renfe', pid: process.pid },
  transports: [new winston.transports.Console()],
});

export default {
  name: 'renfe',
  logger,
  search: env => search({ ...env, logger }),
};
