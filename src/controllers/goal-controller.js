import {
  findGoalsByUserId,
  createGoal,
  deleteGoalByIdAndUser,
  syncGoalWithExistingWorkouts,
} from '../models/goal-model.js';

const getMyGoals = async (req, res) => {
  try {
    const goals = await findGoalsByUserId(req.user.user_id);
    res.json(goals);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
};

const postGoal = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const {goal_type, target_value, current_value, target_date, status} =
      req.body;

    if (!goal_type) {
      return res.status(400).json({error: 'Missing goal_type'});
    }

    const goal_id = await createGoal({
      user_id,
      goal_type: String(goal_type).trim(),
      target_value:
        target_value === '' || target_value === undefined
          ? null
          : Number(target_value),
      current_value:
        current_value === '' || current_value === undefined
          ? 0
          : Number(current_value),
      target_date:
        target_date === '' || target_date === undefined ? null : target_date,
      status: status === '' || status === undefined ? 'active' : String(status),
    });

    await syncGoalWithExistingWorkouts(goal_id, user_id, goal_type);

    res.status(201).json({message: 'Goal created', goal_id});
  } catch (error) {
    console.error('postGoal error:', error);
    res.status(500).json({error: error.message});
  }
};

const deleteGoal = async (req, res) => {
  try {
    const affected = await deleteGoalByIdAndUser(
      Number(req.params.id),
      req.user.user_id,
    );
    if (affected === 0) return res.status(403).json({message: 'forbidden'});
    res.json({message: 'Goal deleted'});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
};

export {getMyGoals, postGoal, deleteGoal};
