import { Knex } from 'knex';

export const up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

export const down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
};
