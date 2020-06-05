import { Router } from 'express';

import PointsController from './app/controllers/PointsController';
import ItemsController from './app/controllers/ItemsController';

const routes = Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;
