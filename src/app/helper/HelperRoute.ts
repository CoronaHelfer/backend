import {Router} from 'express';
import HelperController from './HelperController';

const router = Router();

router.post('/helper', HelperController.offerHelp);
router.put('/helper', HelperController.confirmHelp);
router.get('/helper', HelperController.getListOfOwnHelps);

export default router;
