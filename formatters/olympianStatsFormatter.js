const AllStatsModel = require('../models/allStats.js')
const AllStats = new AllStatsModel()

class OlympianStatsFormatter {
  async statsFormat () {
    return {
      olympian_stats: {
        total_competing_olympians: await AllStats.olympianCount(),
        average_weight: {
          unit: 'kg',
          male_olympians: await AllStats.averageWeight('M'),
          female_olympians: await AllStats.averageWeight('F')
        },
        average_age: await AllStats.averageAge()
      }
    }
  }
}

module.exports = OlympianStatsFormatter
