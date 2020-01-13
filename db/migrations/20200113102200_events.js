
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('events', function(table) {
      table.increments('id').primary()
      table.string('name')
      table.string('sport')

      table.timestamps(true, true)
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('events')
  ])
}
