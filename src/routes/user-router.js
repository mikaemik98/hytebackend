import express from 'express';
import {
  deleteUserById,
  getUserById,
  getUsers,
  loginUser,
  postNewUser,
  putUserById,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(postNewUser);

userRouter.post('/login', loginUser);

userRouter
  .route('/:id')
  .put(putUserById)
  .get(getUserById)
  .delete(deleteUserById);

export default userRouter;
