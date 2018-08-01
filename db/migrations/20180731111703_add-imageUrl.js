
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurants', function (table) {
      table.string('imageUrl');
      table.string('yelpUrl');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurants', function (table) {
      table.dropColumn('imageUrl');
      table.dropColumn('yelpUrl');
    })
  ]);
};
