var express = require('express');
var router = express.Router();

const SportEvents = require('../../../formatters/sportEventsFormatter')

router.get('/', async (request, response) => {
  const events = await new SportEvents().eventsFormat()
  return response.status(200).json({ events: events })
})

module.exports = router;
