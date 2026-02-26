import express from 'express';
import {authenticateToken} from '../middlewares/authentication.js';
import {
  deleteUserById,
  getUserById,
  getUsers,
  postNewUser,
  putUserById,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(postNewUser);

/* userRouter.post('/login', loginUser); */

userRouter
  .route('/:id')
  .put(authenticateToken, putUserById)
  .get(authenticateToken, getUserById)
  .delete(authenticateToken, deleteUserById);

export default userRouter;
