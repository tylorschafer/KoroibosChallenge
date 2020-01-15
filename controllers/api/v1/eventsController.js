var express = require('express')
var router = express.Router()

const SportEvents = require('../../../formatters/sportEventsFormatter')

const EventModel = require('../../../models/event')
const Event = new EventModel()

router.get('/', async (request, response) => {
  const events = await new SportEvents().eventsFormat()
  return response.status(200).json({ events: events })
})

router.get('/:id/medalists', async (request, response) => {
  const event = await Event.find(request.params.id)
  const medalists = await Event.medalists(request.params.id)
  response.status(200).json({ event: event[0].name, medalists: medalists })
})

module.exports = router;
