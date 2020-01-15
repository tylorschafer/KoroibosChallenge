var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

const AllStatsModel = require('../../../models/allStats.js')
const AllStats = new AllStatsModel()

router.get('/', async (request, response) => {
  response.status(200).json({
    olympian_stats: {
      total_competing_olympians: await AllStats.olympianCount(),
      average_weight: {
        unit: 'kg',
        male_olympians: await AllStats.averageWeight('M'),
        female_olympians: await AllStats.averageWeight('F')
      },
      average_age: await AllStats.averageAge()
    }
  })
})

module.exports = router;
