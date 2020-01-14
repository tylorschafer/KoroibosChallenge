var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

let point3

describe('Test the events path', () => {
  beforeEach(async () => {
    await database.raw('truncate table sports cascade')
    await database.raw('truncate table events cascade')
    await database.raw('truncate table olympians cascade')
    await database.raw('truncate table olympianEvents cascade')

    const sport = {
      name: 'Basketball'
    }

    await database('sports').insert(sport, 'id')

    const basketball = await database('sports').where('name', await sport.name)

    const event = {
      name: '3 point contest',
      sport_id: basketball[0].id
    }
    point3 = await database('events').insert(event, 'id')

    const player = {
      name: 'Tylor',
      team: 'USA',
      age: 29,
      sport: '3 point contest',
      total_medals_won: 42
    }

    const tylor = await database('olympians').insert(player, 'id')

    const olympianEvent = {
      event_id: point3.id,
      olympian_id: tylor.id,
      medal: 'Gold'
    }
    await database('olympian_events').insert(olympianEvent, 'id')
  })

  afterEach(() => {
    database.raw('truncate table sports cascade')
    database.raw('truncate table events cascade')
    database.raw('truncate table olympians cascade')
    database.raw('truncate table olympianEvents cascade')
  })

  describe('test event medalists GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get(`/api/v1/events/${point3}/medalists`)

      const results = response.body

      expect(response.statusCode).toBe(200)

      expect(results.event).toBe('3 point contest')
      expect(results.medalists.length).toBe(1)

      expect(results.medalists[0]).toHaveProperty('name')
      expect(results.medalists[0]).toHaveProperty('team')
      expect(results.medalists[0]).toHaveProperty('age')
      expect(results.medalists[0]).toHaveProperty('medal')

      expect(results.medalists[0].name).toBe('Tylor')
      expect(results.medalists[0].team).toBe('USA')
      expect(results.medalists[0].age).toBe(29)
      expect(results.medalists[0].medal).toBe('Gold')
    })
  })
})
