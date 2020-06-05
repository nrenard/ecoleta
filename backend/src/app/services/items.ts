import knex from '../../database/connection';

const table = 'items';

export const list = async () => {
  const items = await knex(table).select('*');

  return items;
};
