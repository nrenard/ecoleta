import knex from '../../database/connection';

const table = 'points';
const tablePointItems = 'point_items';

interface PointI {
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
  latitude: number;
  longitude: number;
};

export const create = async (data: PointI, trx: any) => {
  const point = await trx(table).insert(data);
  return point;
};

export const show = async (id: number) => {
  const point = await knex(table).where('id', id).first();
  return point;
};

export const index = async (city: string, uf: string, items: any) => {
  const point = await knex(table)
    .join(tablePointItems, `${table}.id`, '=', `${tablePointItems}.point_id`)
    .whereIn(`${tablePointItems}.item_id`, items)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select(`${table}.*`);

  return point;
}
