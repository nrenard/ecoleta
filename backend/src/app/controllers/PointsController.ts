import { Request, Response } from 'express';
import knex from '../../database/connection';

import * as pointsService from '../services/point';
import * as pointItemsService from '../services/pointItems';

class PointsController {
  async index (req: Request, res: Response) {
    const { city, uf, items }: any = req.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await pointsService.index(city, uf, parsedItems);

    console.log('{ city, uf, items }: ', { city, uf, items });

    return res.json(points);
  }

  async show(req: Request, res: Response) {
    const { id }: any = req.params;

    const point = await pointsService.show(id);

    if (!point) return res.status(400).json({ message: 'Point not found.' });

    const items = await pointItemsService.list(point.id);

    return res.json({ ...point, items });
  }

  async create(req: Request, res: Response) {
    const { items,...data } = req.body;

    const trx = await knex.transaction();

    const [point_id]: any = await pointsService.create(data, trx);

    await pointItemsService.create({ items, point_id }, trx);

    await trx.commit();

    return res.json({ id: point_id, ...data });
  }
}

export default PointsController;
