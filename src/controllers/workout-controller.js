import {
  getAllWorkouts,
  getWorkoutById,
  deleteWorkout,
  findWorkoutsByUserId,
  insertWorkout,
} from '../models/workout-model.js';

//GET api workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await getAllWorkouts();

    res.json(workouts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//GET api workouts ID
const getWorkout = async (req, res) => {
  try {
    const workout = await getWorkoutById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        error: 'Workout not found',
      });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createWorkouts = async (req, res) => {
  const id = await insertWorkout(req.body);

  res.json({
    message: 'Workout created',
    workout_id: id,
  });
};

//POST api workouts
const postWorkout = async (req, res) => {
  try {
    const {user_id, exercise, weight_kg, reps, sets, workout_date} = req.body;

    // vaaditaan vain nämä
    if (!user_id || !exercise) {
      return res.status(400).json({error: 'Missing fields'});
    }

    const workout_id = await insertWorkout({
      user_id,
      exercise,
      weight_kg: weight_kg ?? null,
      reps: reps ?? null,
      sets: sets ?? null,
      workout_date: workout_date ?? new Date().toISOString().slice(0, 10),
    });

    res.status(201).json({message: 'Workout created', workout_id});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

//DELETE api wokrouts ID
const removeWorkout = async (req, res) => {
  try {
    const affected = await deleteWorkout(req.params.id);

    if (affected === 0) {
      return res.status(404).json({
        error: 'Workout not found',
      });
    }
    res.json({
      message: 'Workout deleted',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getWorkoutsByUserId = async (req, res) => {
  const workouts = await findWorkoutsByUserId(req.params.id);
  res.json(workouts);
};

export {
  getWorkouts,
  getWorkout,
  postWorkout,
  removeWorkout,
  getWorkoutsByUserId,
  createWorkouts,
};
