import {Router} from 'express';
import RequestController from './RequestController';

const router = Router();

router.post('/', RequestController.create);
router.put('/', RequestController.update);
router.get('/', RequestController.getOwn);
router.delete('/', RequestController.deleteOwn);
router.put('/finish', RequestController.finish);

export default router;
