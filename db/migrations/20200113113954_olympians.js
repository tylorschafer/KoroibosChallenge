
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('olympians', function(table) {
      table.increments('id').primary()
      table.string('name')
      table.string('team')
      table.integer('age').nullable()
      table.string('sport')
      table.integer('total_medals_won')

      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('olympians')
  ])
};
