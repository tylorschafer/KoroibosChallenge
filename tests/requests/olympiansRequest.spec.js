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

      const res = response.olympians

      expect(response.statusCode).toBe(200)
      expect(res.body.length).toBe(1)

      expect(res.body[0]).toHaveProperty('name')
      expect(res.body[0].name).toBe('Tylor')
      
      expect(res.body[0]).toHaveProperty('team')
      expect(res.body[0].team).toBe('USA')

      expect(res.body[0]).toHaveProperty('age')
      expect(res.body[0].name).toBe(29)

      expect(res.body[0]).toHaveProperty('sport')
      expect(res.body[0].sport).toBe('Underwater Basket Weaving')

      expect(res.body[0]).toHaveProperty('total_medals_won')
      expect(res.body[0].total_medals_won).toBe(64)
    })
  })
})
