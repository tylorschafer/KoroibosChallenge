var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

const SportEvents = require('../../../formatters/sportEventsFormatter')

router.get('/', async (request, response) => {
  const events = await new SportEvents().eventsFormat()
  return response.status(200).json({ events: events })
})

router.get('/:id/medalists', async (request, response) => {
  const event = await database('events').where('id', request.params.id)
  const medalists = await database('olympian_events')
    .innerJoin('olympians', 'olympian_id', 'olympians.id')
    .select('olympians.name', 'olympians.team', 'olympians.age', 'olympian_events.medal')
    .where('olympian_events.event_id', request.params.id)
    .whereNot('medal', null)
  response.status(200).json({ event: event[0].name, medalists: medalists })
})

module.exports = router;
