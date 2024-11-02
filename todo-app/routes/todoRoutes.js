import express from 'express';
const router = express.Router();
import todoController from '../controllers/todoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.use(authMiddleware);
router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export { router as todoRoutes };
