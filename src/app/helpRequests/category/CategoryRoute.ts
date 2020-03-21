import { Router } from 'express';
import CategoryController from './CategoryController';

const router = Router();

router.get('/', CategoryController.findAll);

export default router;
