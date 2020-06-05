import Knex from 'knex';

const tableName = 'points';

export const up = async (knex: Knex) => {
  await knex.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
  });
};

export const down = async (knex: Knex) => knex.schema.dropTableIfExists(tableName);
