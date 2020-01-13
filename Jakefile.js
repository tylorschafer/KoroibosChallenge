const csv = require('csv-parser')
const fs = require('fs')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

desc('Import all 2016 Summer olympic data.')
task('2016SummerImport', [], function () {
  fs.createReadStream('db/data/olympic_data_2016.csv')
    .pipe(csv())
    .on('data', async (row) => {
      const data = {
        name: row.Name,
        sex: row.Sex,
        age: isNaN(row.Age) ? null : parseInt(row.Age),
        height: isNaN(row.Height) ? null : parseInt(row.Height),
        weight: isNaN(row.weight) ? null : parseInt(row.Weight),
        team: row.Team,
        games: row.Games,
        sport: row.Sport,
        event: row.Event,
        medal: row.Medal
      }
      console.log(data)
      await database('summer_2016').insert(data, 'id')
    })
    .on('end', () => {
      console.log('CSV file successfully migrated.')
    })
})

desc('Import all event data.')
task('eventImport', [], async function () {
  const data = await database('summer_2016').select('sport', 'event').distinct('event')
  data.forEach(async function (eventData) {
    const event = {
      name: eventData.event,
      sport: eventData.sport
    }
    console.log(event)
    await database('events').insert(event, 'id')
  })
  console.log('Imported events successfully')
})

desc('Import all olympian data.')
task('olympianImport', [], async function () {
  const data = await database('summer_2016')
    .select('name', 'team', 'age', 'sport')
    .groupBy('name', 'team', 'age', 'sport')
    .count('medal AS medal_count')
    .whereNot({ medal: 'NA' })
  data.forEach(async function (olympianData) {
    const olympian = {
      name: olympianData.name,
      team: olympianData.team,
      age: olympianData.age,
      sport: olympianData.sport,
      total_medals_won: parseInt(olympianData.medal_count)
    }
    console.log(olympian)
    await database('olympians').insert(olympian, 'id')
  })
  console.log('Imported events successfully')
})
