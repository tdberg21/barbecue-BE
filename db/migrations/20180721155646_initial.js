
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username');
      table.string('email');
      table.string('password');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('restaurants', function(table) {
      table.increments('id').primary();
      table.string('name')
      table.string('rating');
      table.string('notes');
      table.string('date');
      table.integer('user_id').unsigned();
      table.foreign('user_id')
        .references('users.id');

      table.timestamps(true, true);
    })
  ])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('restaurants')
  ]);
};
