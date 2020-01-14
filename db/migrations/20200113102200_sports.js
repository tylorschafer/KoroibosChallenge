
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('sports', function(table) {
      table.increments('id').primary()
      table.string('name')
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('sports')
  ])
}
