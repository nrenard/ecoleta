import Knex from 'knex';

const tableName = 'point_items';

export const up = async (knex: Knex) => {
  await knex.schema.createTable(tableName, table => {
    table.increments('id').primary();

    table.integer('point_id')
      .references('id')
      .inTable('points');

    table.integer('item_id')
      .references('id')
      .inTable('items');
  });
};

export const down = async (knex: Knex) => knex.schema.dropTableIfExists(tableName);
