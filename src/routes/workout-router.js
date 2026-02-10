import express from 'express';

import {
  getWorkouts,
  getWorkout,
  postWorkout,
  removeWorkout,
  getWorkoutsByUserId,
} from '../controllers/workout-controller.js';

const workoutRouter = express.Router();

//GET all workouts
workoutRouter.get('/', getWorkouts);

workoutRouter.get('/user/:id', getWorkoutsByUserId);

//GET workout by id
workoutRouter.get('/:id', getWorkout);

//POST new workout
workoutRouter.post('/', postWorkout);

//DELETE workout
workoutRouter.delete('/:id', removeWorkout);

export default workoutRouter;
