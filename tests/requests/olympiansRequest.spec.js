var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the olympians path', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade');

    const tylor = {
      name: 'Tylor',
      team: 'USA',
      age: 29,
      sport: 'Underwater Basket Weaving',
      total_medals_won: 64
    }
    await database('olympians').insert(tylor, 'id')
  })

  afterEach(() => {
    database.raw('truncate table olympians cascade')
  })

  describe('test olympians GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/olympians")

      const results = response.body.olympians

      expect(response.statusCode).toBe(200)
      expect(results.length).toBe(1)

      expect(results[0]).toHaveProperty('name')
      expect(results[0].name).toBe('Tylor')
      
      expect(results[0]).toHaveProperty('team')
      expect(results[0].team).toBe('USA')

      expect(results[0]).toHaveProperty('age')
      expect(results[0].age).toBe(29)

      expect(results[0]).toHaveProperty('sport')
      expect(results[0].sport).toBe('Underwater Basket Weaving')

      expect(results[0]).toHaveProperty('total_medals_won')
      expect(results[0].total_medals_won).toBe(64)
    })
  })
})
