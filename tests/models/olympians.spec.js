const environment = process.env.NODE_ENV || 'test'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

describe('Test olympians model', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade')

    const tylor = {
      name: 'Tylor',
      team: 'USA',
      age: 29,
      sport: 'Underwater Basket Weaving',
      total_medals_won: 64
    }

    const khan = {
      name: 'Ghengis',
      team: 'Mongolia',
      age: 627,
      sport: 'Wargames',
      total_medals_won: 314
    }
    await database('olympians').insert(tylor, 'id')
    await database('olympians').insert(khan, 'id')
  })

  afterEach(() => {
    database.raw('truncate table olympians cascade')
  })

  describe('test olympian creation', () => {
    it('olympians can be created', async () => {
      const olympians = await database('olympians').select()

      expect(olympians.length).toBe(2)
    })
  })
})
