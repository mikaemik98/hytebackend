///Goal-reitit: /api/goals/me (GET), /api/goals (POST), /api/goals/:id (DELETE), tokenilla.

import express from 'express';
import {authenticateToken} from '../middlewares/authentication.js';
import {
  getMyGoals,
  postGoal,
  deleteGoal,
} from '../controllers/goal-controller.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const goalRouter = express.Router();

goalRouter.post(
  '/',
  authenticateToken,

  body('goal_type', 'goal type required').trim().isLength({min: 2, max: 100}),

  body('target_value').optional({nullable: true}).isFloat({min: 0, max: 1000}),

  body('target_date').optional({nullable: true}).isISO8601(),

  validationErrorHandler,
  postGoal,
);

goalRouter.get('/me', authenticateToken, getMyGoals);
goalRouter.delete('/:id', authenticateToken, deleteGoal);

export default goalRouter;
