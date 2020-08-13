import express from 'express';

import ClassController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';

const router = express.Router();
const classController = new ClassController();
const connectionController = new ConnectionController();

router.post('/classes', classController.create);
router.get('/classes', classController.index);

router.post('/connections', connectionController.create);
router.get('/connections', connectionController.index);

export default router;