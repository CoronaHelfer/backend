import {Router} from 'express';
import RequestController from './RequestController';

const router = Router();

router.post('/', RequestController.create);
router.get('/', RequestController.getOwn);
router.delete('/', RequestController.deleteOwn);

export default router;
