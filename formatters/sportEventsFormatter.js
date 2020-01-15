const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const EventModel = require('../models/event')
const Event = new EventModel()

class SportEventsFormatter {

  async eventsFormat () {
    const sports = await database('sports').select('name', 'id').distinct('name')
    const result = await Promise.all(sports.map(async sport => {
      return {
        sport: sport.name, events: await Event.findAllBySport(sport.id)
      }
    }))
    return result
  }
}

module.exports = SportEventsFormatter
