
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('events', function(table) {
      table.increments('id').primary()
      table.string('name')
      table.integer('sport_id').unsigned().references('id').inTable('sports')
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('events')
  ])
}
