import { Router } from 'express';
import { createTask, getTasks } from '../controllers/taskController.js';
import { validateTaskBody } from '../middlewares/taskValidation.js';

const router = Router();

router.post('/tasks', validateTaskBody, createTask);
router.get('/tasks', getTasks);

export default router;