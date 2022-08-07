const express = require('express');
const TicketingApp = require('../../../ticketing-app');

const app = express();

app.get('/search', async (req, res) => {
  const result = await TicketingApp.search({
    origin: req.query.origin,
    destination: req.query.destination,
    date: new Date(req.query.date),
  });

  return res.json(result);
});

module.exports = app;
