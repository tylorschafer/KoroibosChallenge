const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Olympian {
  async ageSearch (ageGroup) {
    if (ageGroup === 'oldest') {
      const max = await database('olympians').max('age')
      return database('olympians').where('age', max[0].max)
    } else if (ageGroup === 'youngest') {
      const min = await database('olympians').min('age')
      return database('olympians').where('age', min[0].min)
    }
  }

  all () {
    return database('olympians').select('name', 'team', 'age', 'sport', 'total_medals_won')
  }
}

module.exports = Olympian
