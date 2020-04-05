import {Router} from 'express';
import RequestController from './RequestController';

const router = Router();

router.post('/', RequestController.find);

export default router;
