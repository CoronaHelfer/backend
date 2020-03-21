import { Router } from 'express';
import UserController from './UserController';

const router = Router();

router.post('/', UserController.delete);

export default router;
