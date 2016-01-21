
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function (table) {
    table.increments();
    table.string('name');
    table.string('street1');
    table.string('street2');
    table.string('city');
    table.string('state');
    table.integer('zip');
    table.integer('neighborhood_id');
    table.string('cuisine');
    table.integer('rating');
    table.string('image');
    table.text('bio');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
