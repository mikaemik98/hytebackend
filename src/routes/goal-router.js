import express from 'express';
import {authenticateToken} from '../middlewares/authentication.js';
import {
  getMyGoals,
  postGoal,
  deleteGoal,
} from '../controllers/goal-controller.js';

const goalRouter = express.Router();

goalRouter.get('/me', authenticateToken, getMyGoals);
goalRouter.post('/', authenticateToken, postGoal);
goalRouter.delete('/:id', authenticateToken, deleteGoal);

export default goalRouter;
