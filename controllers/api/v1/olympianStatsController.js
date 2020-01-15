var express = require('express');
var router = express.Router();

const OlympianStatsFormatter = require('../../../formatters/olympianStatsFormatter')
const OlympianStats = new OlympianStatsFormatter()

router.get('/', async (request, response) => {
  response.status(200).json(await OlympianStats.statsFormat())
})

module.exports = router;
