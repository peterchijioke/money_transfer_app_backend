import { Knex } from 'knex';

export const up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable(); 
    table.string('last_name').notNullable();  
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('phone').notNullable(); 
    table.string('bank_account').nullable();
    table.timestamps(true, true);
  });
};

export const down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
};
