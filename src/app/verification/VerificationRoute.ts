import {Router} from 'express';
import VerificationController from './VerificationController';

const router = Router();

router.post('/', VerificationController.verifyMail);

export default router;
