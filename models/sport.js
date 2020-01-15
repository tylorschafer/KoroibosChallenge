const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Sport {
  allUniq () {
    return database('sports').select('name', 'id').distinct('name')
  }
}

module.exports = Sport