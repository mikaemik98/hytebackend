import promisePool from '../utils/database.js';

//GET all workouts
const getAllWorkouts = async () => {
  const [rows] = await promisePool.execute(
    `SELECT workout_id, user_id, exercise, weight_kg, reps, workout_date FROM workout_log ORDER BY workout_date DESC`,
  );
  return rows;
};

//GET workout by id
const getWorkoutById = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT workout_id, user_id, exercise, weight_kg, reps, workout_date FROM workout_log WHERE workout_id = ?`,
    [id],
  );
  return rows[0];
};

//CREATE workout
const createWorkout = async (workout) => {
  const sql = `INSERT INTO workout_log (user_id, exercise, weight_kg, reps, workout_date) VALUES (?, ?, ?, ?, ?)`;

  const [result] = await promisePool.execute(sql, [
    workout.user_id,
    workout.exercise,
    workout.weight_kg,
    workout.reps,
    workout.workout_date,
  ]);

  return result.insertId;
};

const insertWorkout = async (workout) => {
  const sql = `INSERT INTO workout_log (user_id, exercise, sets, reps, weight_kg, workout_date) VALUES (?, ?, ?, ?, ? ,?)`;

  const [result] = await promisePool.execute(sql, [
    workout.user_id,
    workout.exercise,
    workout.sets || null,
    workout.reps,
    workout.weight_kg,
    workout.workout_date,
  ]);
  return result.insertId;
};

//DELETE workout
const deleteWorkout = async (id) => {
  const [result] = await promisePool.execute(
    `DELETE FROM workout_log WHERE workout_id = ?`,
    [id],
  );
  return result.affectedRows;
};

const findWorkoutsByUserId = async (user_id) => {
  const [rows] = await promisePool.execute(
    `SELECT * FROM workout_log WHERE user_id = ? ORDER BY workout_date DESC, workout_id DESC`,
    [user_id],
  );
  return rows;
};

export {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  deleteWorkout,
  findWorkoutsByUserId,
  insertWorkout,
};
