var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the olympiansAge path', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade');

    const tylor = {
      name: 'Tylor',
      team: 'USA',
      age: 29,
      sport: 'Underwater Basket Weaving',
      total_medals_won: 64
    }

    const jeff = {
      name: 'Jeff',
      team: 'USA',
      age: 29,
      sport: 'Fake Wrestling',
      total_medals_won: 34
    }

    const molly = {
      name: 'Molly',
      team: 'USA',
      age: 21,
      sport: 'Hardcore Knitting',
      total_medals_won: 32
    }
    await database('olympians').insert(tylor, 'id')
    await database('olympians').insert(molly, 'id')
    await database('olympians').insert(jeff, 'id')
  })

  afterEach(() => {
    database.raw('truncate table olympians cascade')
  })

  describe('test olympiansAge GET', () => {
    it('youngest age', async () => {
      const response = await request(app)
        .get("/api/v1/olympians?age=youngest")

      const results = response.body

      console.log(results)

      expect(response.statusCode).toBe(200)
      expect(results.length).toBe(1)

      expect(results[0]).toHaveProperty('name')
      expect(results[0].name).toBe('Molly')

      expect(results[0]).toHaveProperty('team')
      expect(results[0].team).toBe('USA')

      expect(results[0]).toHaveProperty('age')
      expect(results[0].age).toBe(21)

      expect(results[0]).toHaveProperty('sport')
      expect(results[0].sport).toBe('Hardcore Knitting')

      expect(results[0]).toHaveProperty('total_medals_won')
      expect(results[0].total_medals_won).toBe(32)
    })

    it('oldest age', async () => {
      const response = await request(app)
        .get("/api/v1/olympians?age=oldest")

      const results = response.body

      expect(response.statusCode).toBe(200)
      expect(results.length).toBe(2)

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

      expect(results[1]).toHaveProperty('name')
      expect(results[1].name).toBe('Jeff')

      expect(results[1]).toHaveProperty('team')
      expect(results[1].team).toBe('USA')

      expect(results[1]).toHaveProperty('age')
      expect(results[1].age).toBe(29)

      expect(results[1]).toHaveProperty('sport')
      expect(results[1].sport).toBe('Fake Wrestling')

      expect(results[1]).toHaveProperty('total_medals_won')
      expect(results[1].total_medals_won).toBe(34)
    })
  })
})
