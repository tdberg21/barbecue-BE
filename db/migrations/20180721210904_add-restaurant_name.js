
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurants', function(table) {
      table.string('restaurant_name');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurants', function(table) {
      table.dropColumn('restaurant_name');
    })
  ])
};
