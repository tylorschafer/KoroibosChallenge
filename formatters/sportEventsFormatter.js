const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class SportEventsFormatter {
  async findEvents (id) {
    const result = await database('events')
      .where('sport_id', id)
      .pluck('name')
      .then((result) => result)
    return result
  }

  async eventsFormat () {
    const sports = await database('sports').select('name', 'id').distinct('name')
    const result = await Promise.all(sports.map(async sport => {
      return {
        sport: sport.name, events: await this.findEvents(sport.id)
      }
    }))
    return result
  }
}

module.exports = SportEventsFormatter
