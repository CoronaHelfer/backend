import {Router} from 'express';
import FlyerController from './FlyerController';

const router = Router();

router.get('/helper', FlyerController.helper);
router.get('/seeker', FlyerController.seeker);

export default router;
