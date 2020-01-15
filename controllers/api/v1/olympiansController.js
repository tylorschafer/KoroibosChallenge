var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

const OlympianModel = require('../../../models/olympian.js')
const Olympian = new OlympianModel()

router.get('/', async (request, response) => {
  if (Object.keys(request.query).includes('age')) {
    if (request.query.age === 'oldest' || request.query.age == 'youngest') {
      Olympian.ageSearch(request.query.age)
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
    Olympian.all()
      .then((olympians) => {
        response.status(200).json({ olympians })
      })
      .catch((error) => {
        response.status(500).json({ error })
      })
  }
})

module.exports = router;
