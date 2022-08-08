const { search } = require('./search');
const { reserve } = require('./reserve');

process.on('message', async msg => {
  switch (msg.type) {
    case 'SEARCH':
      console.log(`RENFE: received SEARCH`);
      const tickets = await search({ dateTime: new Date(msg.payload.date) });
      console.log('RENFE: sending results to parent process');
      process.send(tickets);
      break;
    case 'RESERVE':
      const reservationResult = await reserve();
      process.send(reservationResult);
      break;
    default:
      break;
  }

  process.exit(0);
});
