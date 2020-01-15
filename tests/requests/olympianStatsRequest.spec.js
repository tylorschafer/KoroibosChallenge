var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the olympian_stats path', () => {
  beforeEach(async () => {
    await database.raw('truncate table summer_2016 cascade');

    const olymp1 = {
      name: 'Moe',
      sex: 'M',
      height: 170,
      weight: 160,
      team: 'USA',
      age: 29,
      sport: 'Basketball',
      event: '3 point contest',
      medal: 'Gold'
    }
    const olymp2 = {
      name: 'Joe',
      sex: 'M',
      height: 190,
      weight: 180,
      team: 'USA',
      age: 20,
      sport: 'Basketball',
      event: '3 point contest',
      medal: 'Silver'
    }
    const olymp3 = {
      name: 'Sue',
      sex: 'F',
      height: 150,
      weight: 130,
      team: 'USA',
      age: 22,
      sport: 'Track',
      event: '100 M Sprint',
      medal: 'Gold'
    }
    const olymp4 = {
      name: 'Sue',
      sex: 'F',
      height: 150,
      weight: 130,
      team: 'USA',
      age: 22,
      sport: 'Track',
      event: '200 M Sprint',
      medal: 'Silver'
    }

    await database('summer_2016').insert(olymp1, 'id')
    await database('summer_2016').insert(olymp2, 'id')
    await database('summer_2016').insert(olymp3, 'id')
    await database('summer_2016').insert(olymp4, 'id')
  })

  afterEach(() => {
    database.raw('truncate table summer_2016 cascade')
  })

  describe('test olympians_stats GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/olympian_stats")

      const results = response.body

      expect(response.statusCode).toBe(200)

      expect(results.olympian_stats).toHaveProperty('total_competing_olympians')
      expect(results.olympian_stats.total_competing_olympians).toBe(3)
      
      expect(results.olympian_stats).toHaveProperty('average_weight')
      expect(results.olympian_stats.average_weight).toHaveProperty('unit')
      expect(results.olympian_stats.average_weight.unit).toBe('kg')

      expect(results.olympian_stats.average_weight).toHaveProperty('male_olympians')
      expect(results.olympian_stats.average_weight.male_olympians).toBe(170)

      expect(results.olympian_stats.average_weight).toHaveProperty('female_olympians')
      expect(results.olympian_stats.average_weight.female_olympians).toBe(130)

      expect(results.olympian_stats).toHaveProperty('average_age')
      expect(results.olympian_stats.average_age).toBe(23.7)
    })
  })
})
