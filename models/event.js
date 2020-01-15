const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Event {
  medalists (id) {
    return database('olympian_events')
      .innerJoin('olympians', 'olympian_id', 'olympians.id')
      .select('olympians.name', 'olympians.team', 'olympians.age', 'olympian_events.medal')
      .where('olympian_events.event_id', id)
      .whereNot('medal', null)
  }

  find (id) {
    return database('events').where('id', id)
  }
}

module.exports = Event