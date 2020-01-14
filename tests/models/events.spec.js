const environment = process.env.NODE_ENV || 'test'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

describe('Test olympians model', () => {
  beforeEach(async () => {
    await database.raw('truncate table events cascade')

    const watersports = {
      name: 'Watersports'
    }

    const sport = await database('sports').insert(watersports, 'id')

    const event1 = {
      name: 'Underwater Basket Weaving',
      sport_id: sport.id
    }

    const event2 = {
      name: 'Synchronized Swimming',
      sport_id: sport.id
    }
    await database('events').insert(event1, 'id')
    await database('events').insert(event2, 'id')
  })

  afterEach(() => {
    database.raw('truncate table events cascade')
  })

  describe('test olympian creation', () => {
    it('olympians can be created', async () => {
      const events = await database('events').select()

      expect(events.length).toBe(2)
      expect(events[0].name).toBe('Underwater Basket Weaving')
      expect(events[1].name).toBe('Synchronized Swimming')
    })
  })
})
