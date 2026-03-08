///User-reitit: GET/POST /api/users, GET /api/users/:id, PUT/DELETE suojattuna (oma käyttäjä).

import express from 'express';
import {authenticateToken} from '../middlewares/authentication.js';
import {
  deleteUserById,
  getUserById,
  getUsers,
  postNewUser,
  putUserById,
} from '../controllers/user-controller.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('username', 'username must be 3-20 characters long and alphanumeric')
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('password', 'minimum password length is 8 characters')
      .trim()
      .isLength({min: 8, max: 128}),
    body('email', 'must be a valid email address')
      .trim()
      .isEmail()
      .normalizeEmail(),
    validationErrorHandler,
    postNewUser,
  );

userRouter
  .route('/:id')
  .put(authenticateToken, putUserById)
  .get(authenticateToken, getUserById)
  .delete(authenticateToken, deleteUserById);

export default userRouter;
