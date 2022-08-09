import winston from 'winston';
import search from './search';

const CARRIER_NAME = 'renfe';

const logger = winston.createLogger({
  level: 'silly',
  defaultMeta: { carrier: CARRIER_NAME, pid: process.pid },
  transports: [new winston.transports.Console()],
});

export default {
  name: CARRIER_NAME,
  search: env => search({ ...env, _logger: logger }),
  _logger: logger,
};
