var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the events path', () => {
  beforeEach(async () => {
    await database.raw('truncate table events cascade');
    await database.raw('truncate table sports cascade');

    const sport = {
      name: 'basketball'
    }

    await database('sports').insert(sport, 'id')

    const basketball = await database('sports').where('name', await sport.name)

    const tylor = {
      name: '3 point contest',
      sport_id: basketball[0].id
    }
    await database('events').insert(tylor, 'id')
  })

  afterEach(() => {
    database.raw('truncate table events cascade')
    database.raw('truncate table sports cascade')
  })

  describe('test events GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/events")

      console.log(response.body)

      const results = response.body.events

      expect(response.statusCode).toBe(200)
      expect(results.length).toBe(1)

      expect(results[0]).toHaveProperty('sport')
      expect(results[0].sport).toBe('Basketball')
      
      expect(results[0]).toHaveProperty('events')
      expect(results[0].events[0]).toBe('3 point contest')
    })
  })
})
