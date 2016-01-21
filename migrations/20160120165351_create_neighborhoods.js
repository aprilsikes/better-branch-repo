
exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighborhoods', function (table) {
    table.increments();
    table.string('name');
    table.string('epicenter');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighborhoods');
};
