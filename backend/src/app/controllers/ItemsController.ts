import { Request, Response } from 'express';

import * as itemsService from '../services/items';

class ItemsController {
    async index(req: Request, res: Response) {
      const items = await itemsService.list();
      return res.json(items);
    }
}

export default ItemsController;
