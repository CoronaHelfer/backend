import {Router} from 'express';
import RequestController from './RequestController';

const router = Router();

router.get('/', RequestController.find);
router.post('/', RequestController.create);
router.post('/helper', RequestController.offerHelp);
router.put('/helper', RequestController.confirmHelp);

export default router;
