import {Router} from 'express';
import UserController from './UserController';

const router = Router();

router.get('/me', UserController.me);
router.delete('/', UserController.delete);
router.get('/', UserController.getOtherUser);
router.post('/fcmToken', UserController.saveFcmToken);

export default router;
