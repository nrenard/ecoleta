import Knex from 'knex';

const tableName = 'items';

export const up = async (knex: Knex) => {
  await knex.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
};

export const down = async (knex: Knex) => knex.schema.dropTableIfExists(tableName);
