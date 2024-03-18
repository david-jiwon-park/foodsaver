exports.up = function (knex) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();
    table.string('recipe_uri').notNullable();
    table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
return knex.schema.dropTable('favorites');
};
