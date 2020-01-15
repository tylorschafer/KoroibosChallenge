var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

router.get('/', async (request, response) => {
  const maleWeights = await database('summer_2016')
    .groupBy('name', 'weight', 'height', 'age')
    .where('sex', 'M')
    .whereNot('weight', null)
    .pluck('weight')

  const femaleWeights = await database('summer_2016')
    .groupBy('name', 'weight', 'height', 'age')
    .where('sex', 'F')
    .whereNot('weight', null)
    .pluck('weight')

  const ages = await database('summer_2016')
    .groupBy('name', 'weight', 'height', 'age')
    .pluck('age')

  const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length

  response.status(200).json({
    olympian_stats: {
      total_competing_olympians: ages.length,
      average_weight: {
        unit: 'kg',
        male_olympians: Math.round(average(maleWeights) * 10) / 10,
        female_olympians: Math.round(average(femaleWeights) * 10) / 10
      },
      average_age: Math.round(average(ages) * 10) / 10
    }
  })

})

module.exports = router;
