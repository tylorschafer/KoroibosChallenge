var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the events path', () => {
  beforeEach(async () => {
    await database.raw('truncate table events cascade');

    const tylor = {
      name: '3 point contest',
      sport: 'Basketball'
    }
    await database('events').insert(tylor, 'id')
  })

  afterEach(() => {
    database.raw('truncate table events cascade')
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
