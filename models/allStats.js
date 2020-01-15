const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class AllStats {
  constructor () {
    this.average = arr => arr.reduce((a, b) => a + b, 0) / arr.length
  }

  async olympianCount () {
    const result = await database('olympians').count('id')
    return parseInt(result[0].count)
  }

  round (stat) {
    return Math.round(this.average(stat) * 10) / 10
  }

  async averageAge () {
    const ages = await database('summer_2016')
      .groupBy('name', 'weight', 'height', 'age')
      .pluck('age')
    return this.round(ages)
  }

  async averageWeight (gender) {
    const weights = await database('summer_2016')
      .groupBy('name', 'weight', 'height', 'age')
      .where('sex', gender)
      .whereNot('weight', null)
      .pluck('weight')
    return this.round(weights)
  }
}

module.exports = AllStats