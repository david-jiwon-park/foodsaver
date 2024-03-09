exports.up = function (knex) {
    return knex.schema.createTable('notifications', (table) => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('enabled').notNullable();
      table.integer('days_before').notNullable();
    });
  };
  
exports.down = function (knex) {
  return knex.schema.dropTable('notifications');
};