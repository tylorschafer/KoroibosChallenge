const csv = require('csv-parser')
const fs = require('fs')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

desc('Import all olympian data.')
task('olympianImport', [], function () {
  fs.createReadStream('db/data/olympic_data_2016.csv')
    .pipe(csv())
    .on('data', async (row) => {
      const olympian = {
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
      console.log(olympian)
      await database('olympians').insert(olympian, 'id')
    })
    .on('end', () => {
      console.log('CSV file successfully migrated.')
    })
})

desc('Import all event data.')
task('eventImport', [], async function () {
  const data = await database('olympians').select('sport', 'event').distinct('event')
  data.forEach(async function (olympian) {
    const event = {
      name: olympian.event,
      sport: olympian.sport
    }
    console.log(event)
    await database('events').insert(event, 'id')
  })
  console.log('Imported events successfully')
})