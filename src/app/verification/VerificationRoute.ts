import {Router} from 'express';
import VerificationController from './VerificationController';

const router = Router();

router.get('/', VerificationController.verifyMail);

export default router;
