///Workout-reitit: /api/workouts (GET+POST), /api/workouts/user/:id, /api/workouts/:id (GET/DELETE).

import express from 'express';
import {
  getWorkouts,
  getWorkout,
  postWorkout,
  removeWorkout,
  getWorkoutsByUserId,
} from '../controllers/workout-controller.js';

import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';
import {authenticateToken} from '../middlewares/authentication.js';

const workoutRouter = express.Router();

workoutRouter
  .route('/')
  .get(authenticateToken, getWorkouts)
  .post(
    authenticateToken,

    body('exercise', 'exercise name required')
      .trim()
      .isLength({min: 2, max: 100}),

    body('weight_kg').optional({nullable: true}).isFloat({min: 0, max: 500}),
    body('reps').optional({nullable: true}).isInt({min: 1, max: 100}),
    body('sets').optional({nullable: true}).isInt({min: 1, max: 20}),
    body('workout_date').optional().isISO8601(),

    validationErrorHandler,
    postWorkout,
  );

workoutRouter.get('/user/:id', authenticateToken, getWorkoutsByUserId);

workoutRouter
  .route('/:id')
  .get(authenticateToken, getWorkout)
  .delete(authenticateToken, removeWorkout);

export default workoutRouter;
