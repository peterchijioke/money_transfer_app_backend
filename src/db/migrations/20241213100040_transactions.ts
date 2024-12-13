
import { Knex } from 'knex';

exports.up = function (knex: Knex): Promise<void>  {
  return knex.schema.createTable('transactions', function(table) {
    table.increments('id').primary();
    table.string('merchant_ref').notNullable();
    table.string('trx_ref').notNullable();
    table.string('account_name').notNullable();
    table.string('account_number').notNullable();
    table.string('currency').notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.string('status').notNullable();
    table.string('response').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function (knex: Knex): Promise<void>  {
  return knex.schema.dropTableIfExists('transactions');
};
