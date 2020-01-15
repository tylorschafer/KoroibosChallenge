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
        weight: isNaN(row.Weight) ? null : parseInt(row.Weight),
        team: row.Team,
        games: row.Games,
        sport: row.Sport,
        event: row.Event,
        medal: row.Medal === 'NA' ? null : row.Medal
      }
      console.log(data)
      await database('summer_2016').insert(data, 'id')
    })
    .on('end', () => {
      console.log('CSV file successfully migrated.')
    })
})

desc('Import all sport data.')
task('sportImport', [], async function () {
  const data = await database('summer_2016').select('sport').distinct('sport')
  data.forEach(async function (sportData) {
    const sport = {
      name: sportData.sport
    }
    console.log(sport)
    await database('sports').insert(sport, 'id')
  })
  console.log('Imported sports successfully')
})

desc('Import all event data.')
task('eventImport', [], async function () {
  const data = await database('summer_2016').select('sport', 'event').distinct('event')
  data.forEach(async function (eventData) {
    const sportId = await database('sports').where('name', eventData.sport)
    const event = {
      name: eventData.event,
      sport_id: sportId[0].id
    }
    console.log(event)
    await database('events').insert(event, 'id')
  })
  console.log('Imported events successfully')
})

desc('Import all olympian data.')
task('olympianImport', [], async function () {
  const winnerData = await database('summer_2016')
    .select('name', 'team', 'age', 'sport')
    .groupBy('name', 'team', 'age', 'sport')
    .count('medal AS medal_count')
  winnerData.forEach(async function (olympianData) {
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

desc('Import all olympianEvent data.')
task('olympianEventsImport', [], async function () {
  const data = await database('summer_2016')
    .select('name', 'team', 'age', 'sport', 'event', 'medal')
  data.forEach(async function (olympianData) {
    const eventId = await database('events').where('name', olympianData.event)
    const olympianId = await database('olympians').where('name', olympianData.name)
    const olympianEvent = {
      olympian_id: olympianId[0].id,
      event_id: eventId[0].id,
      medal: olympianData.medal
    }
    console.log(olympianEvent)
    await database('olympian_events').insert(olympianEvent, 'id')
  })
  console.log('Imported events successfully')
})

