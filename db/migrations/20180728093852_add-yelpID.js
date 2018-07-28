
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurants', function(table) {
      table.string('yelpId');
      table.string('meal');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurants', function (table) {
      table.dropColumn('yelpId');
      table.dropColumn('meal');
    })
  ]);
};
