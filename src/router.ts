import express from 'express';
import requestRouter from './resources/request/request-router';

const router = express.Router();

router.use('/request', requestRouter);

export default router;
