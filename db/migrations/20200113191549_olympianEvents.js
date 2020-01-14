
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('olympian_events', function(table) {
      table.increments('id').primary()
      table.integer('event_id').unsigned().references('id').inTable('events')
      table.integer('olympian_id').unsigned().references('id').inTable('olympians')
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('olympian_events')
  ])
}