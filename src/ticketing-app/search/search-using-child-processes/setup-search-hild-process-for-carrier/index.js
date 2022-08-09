import Path from 'path';
import * as ChildProcess from 'child_process';

const setupSearchChildProcessForCarrier = env => carrier => {
  const childProcess = ChildProcess.fork(
    Path.resolve(__dirname, `../../carriers/${carrier.name}/process-handler.js`)
  );

  return new Promise(resolve => {
    childProcess.on('message', resolve);
    childProcess.send({ type: 'SEARCH', payload: env });
  });
};

export default setupSearchChildProcessForCarrier;
