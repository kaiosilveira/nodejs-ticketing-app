import Renfe from '.';

process.on('message', async msg => {
  switch (msg.type) {
    case 'SEARCH':
      const { params, result } = await Renfe.search(msg.payload);
      Renfe.logger.info('sending results to parent process');
      process.send({ params, result });
      process.exit(0);
    default:
      break;
  }
});
