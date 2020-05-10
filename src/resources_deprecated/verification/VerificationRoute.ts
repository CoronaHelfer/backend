import {Router} from 'express';
import VerificationController from './VerificationController';

const router = Router();

router.get('/', VerificationController.verifyMail);
router.get('/resend', VerificationController.resendMail);

export default router;
