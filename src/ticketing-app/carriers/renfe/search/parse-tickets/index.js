const parseTickets = env => {
  env.logger.info('parsing final result');
  return {
    ...env,
    result: env['_renfe'].result.map(ticket => ({
      date: ticket.date,
      origin: ticket.origin,
      destination: ticket.destination,
      price: ticket.price,
      carrier: 'renfe',
    })),
  };
};

export default parseTickets;
