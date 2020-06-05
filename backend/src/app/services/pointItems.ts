import knex from '../../database/connection';

const table = 'point_items';

interface DataI {
  items: [number];
  point_id: number;
};

export const create = async ({ items, point_id }: DataI, trx: any) => {
  const pointItems = items.map((item_id) => ({
    item_id,
    point_id
  }));

  const point = await trx(table).insert(pointItems);

  return point;
};

export const list = async (point_id: number) => {
  const items = await knex('items')
    .join(table, 'items.id', '=', `${table}.item_id`)
    .where(`${table}.point_id`, point_id)
    .select('items.title');

  return items.map(item => item.title);
}
