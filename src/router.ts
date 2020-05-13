import express from 'express';
import userRouter from './resources/user/user-router';
import helpRequestRouter from './resources/help-request/help-request-router';

const router = express.Router();

router.use('/users', userRouter);
router.use('/requests', helpRequestRouter);

export default router;
