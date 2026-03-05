///Goal-malli: SQL-kyselyt goals-tauluun + apufunktioita (synkkaus, completed-status).

import promisePool from '../utils/database.js';

// list user's goals
const findGoalsByUserId = async (user_id) => {
  const [rows] = await promisePool.execute(
    `SELECT goal_id, user_id, goal_type, target_value, current_value, target_date, status
     FROM goals
     WHERE user_id = ?
     ORDER BY status ASC, target_date ASC, goal_id DESC`,
    [user_id],
  );
  return rows;
};

const createGoal = async (goal) => {
  const sql = `
    INSERT INTO goals (user_id, goal_type, target_value, current_value, target_date, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const params = [
    goal.user_id,
    goal.goal_type,
    goal.target_value ?? null,
    goal.current_value ?? 0,
    goal.target_date ?? null,
    goal.status ?? 'active',
  ];

  const [result] = await promisePool.execute(sql, params);
  return result.insertId;
};

// delete only own goal
const deleteGoalByIdAndUser = async (goal_id, user_id) => {
  const [result] = await promisePool.execute(
    `DELETE FROM goals WHERE goal_id = ? AND user_id = ?`,
    [goal_id, user_id],
  );
  return result.affectedRows;
};

/**
 * Update goal progress from a workout:
 * If goal_type matches exercise (case-insensitive), update current_value = max(current_value, weight_kg)
 * and set completed if reached target.
 */
const updateGoalsFromWorkout = async (user_id, exercise, weight_kg) => {
  if (weight_kg === null || weight_kg === undefined) return 0;

  const [result] = await promisePool.execute(
    `UPDATE goals
     SET
       current_value = GREATEST(IFNULL(current_value, 0), ?),
       status = CASE
         WHEN target_value IS NOT NULL AND ? >= target_value THEN 'completed'
         ELSE status
       END
     WHERE user_id = ?
       AND status <> 'completed'
       AND LOWER(goal_type) = LOWER(?)`,
    [Number(weight_kg), Number(weight_kg), user_id, exercise],
  );
  return result.affectedRows;
};

/**
 * Update "weight/bodyweight" goals from diary entry:
 * For weight goals we assume "completed" if current_value <= target_value (weight loss goal).
 */
const updateGoalsFromEntryWeight = async (user_id, weight) => {
  if (weight === null || weight === undefined) return 0;

  const [result] = await promisePool.execute(
    `UPDATE goals
     SET
       current_value = ?,
       status = CASE
         WHEN target_value IS NOT NULL AND ? <= target_value THEN 'completed'
         ELSE status
       END
     WHERE user_id = ?
       AND status <> 'completed'
       AND LOWER(goal_type) IN ('weight','bodyweight')`,
    [Number(weight), Number(weight), user_id],
  );
  return result.affectedRows;
};

const syncGoalWithExistingWorkouts = async (goal_id, user_id, goal_type) => {
  const [rows] = await promisePool.execute(
    `SELECT MAX(weight_kg) as max_weight
    FROM workout_log
    WHERE user_id = ?
    AND LOWER(exercise) = LOWER(?)
    `,
    [user_id, goal_type],
  );

  const maxWeight = rows[0]?.max_weight;

  if (maxWeight !== null && maxWeight !== undefined) {
    await promisePool.execute(
      `
      UPDATE goals
      SET
      current_value = ?,
      status = CASE
      WHEN target_value IS NOT NULL AND ? >= target_value
      THEN 'completed'
      ELSE status
      END
      WHERE goal_id = ?
      `,
      [maxWeight, maxWeight, goal_id],
    );
  }
};

export {
  findGoalsByUserId,
  createGoal,
  deleteGoalByIdAndUser,
  updateGoalsFromWorkout,
  updateGoalsFromEntryWeight,
  syncGoalWithExistingWorkouts,
};
