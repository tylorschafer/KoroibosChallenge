const EventModel = require('../models/event')
const Event = new EventModel()

const SportModel = require('../models/sport')
const Sport = new SportModel()

class SportEventsFormatter {

  async eventsFormat () {
    const sports = await Sport.allUniq()
    const result = await Promise.all(sports.map(async sport => {
      return {
        sport: sport.name, events: await Event.findAllBySport(sport.id)
      }
    }))
    return result
  }
}

module.exports = SportEventsFormatter
