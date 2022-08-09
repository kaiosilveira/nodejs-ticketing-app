import winston from 'winston';
import search from './search';

export default {
  name: 'renfe',
  search: env =>
    search({
      ...env,
      logger: winston.createLogger({
        level: 'silly',
        defaultMeta: { carrier: 'renfe', pid: process.pid },
        transports: [new winston.transports.Console()],
      }),
    }),
};
