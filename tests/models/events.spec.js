const environment = process.env.NODE_ENV || 'test'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

describe('Test olympians model', () => {
  beforeEach(async () => {
    await database.raw('truncate table events cascade')

    const event1 = {
      name: 'Underwater Basket Weaving',
      sport: 'Watersports'
    }

    const event2 = {
      name: 'Synchronized Swimming',
      sport: 'Watersports'
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
      expect(events[0].sport).toBe('Watersports')
      expect(events[1].name).toBe('Synchronized Swimming')
      expect(events[1].sport).toBe('Watersports')
    })
  })
})
