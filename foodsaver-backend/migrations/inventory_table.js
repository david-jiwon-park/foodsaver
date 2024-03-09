exports.up = function (knex) {
    return knex.schema.createTable('inventory', (table) => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('food_item').notNullable();
      table.date('exp_date').notNullable();
      table.boolean('discarded').notNullable();
    });
  };
  
exports.down = function (knex) {
  return knex.schema.dropTable('inventory');
};
  