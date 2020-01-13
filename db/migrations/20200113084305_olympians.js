
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('summer_2016', function(table) {
      table.increments('id').primary()
      table.string('name')
      table.string('sex')
      table.integer('age').nullable()
      table.integer('height').nullable()
      table.integer('weight').nullable()
      table.string('team')
      table.string('games')
      table.string('sport')
      table.string('event')
      table.string('medal')

      table.timestamps(true, true)
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('summer_2016')
  ])
}
