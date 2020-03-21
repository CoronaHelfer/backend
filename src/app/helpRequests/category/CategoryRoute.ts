import { Router } from 'express';
import CategoryController from './CategoryController';

const router = Router();

router.post('/', CategoryController.create);
router.get('/', CategoryController.findAll);

export default router;
