import {Router} from 'express';
import HelperController from './HelperController';

const router = Router();

router.post('/', HelperController.offerHelp);
router.put('/', HelperController.confirmHelp);
router.get('/', HelperController.getListOfOwnHelps);
router.delete('/', HelperController.removeHelperAsConfirmed);

export default router;
