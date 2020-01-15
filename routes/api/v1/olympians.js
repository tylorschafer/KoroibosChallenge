var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

router.get('/', async (request, response) => {
  if (Object.keys(request.query).includes('age')) {
    const maxAge = await database('olympians').max('age')
    const minAge = await database('olympians').min('age')
    if (request.query.age === 'oldest') {
      database('olympians').where('age', maxAge[0].max)
        .then((olympians) => {
          response.status(200).json(olympians)
        })
        .catch((error) => {
          response.status(500).json({ error })
        })
    } else if (request.query.age === 'youngest') {
      database('olympians').where('age', minAge[0].min)
        .then((olympians) => {
          response.status(200).json(olympians)
        })
        .catch((error) => {
          response.status(500).json({ error })
        })
    } else {
      response.status(200).json({ error: 'Incorrect Query Parameter' })
    }
  } else {
    database('olympians').select('name', 'team', 'age', 'sport', 'total_medals_won')
      .then((olympians) => {
        response.status(200).json({ olympians })
      })
      .catch((error) => {
        response.status(500).json({ error })
      })
  }
})

module.exports = router;
