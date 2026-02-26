import express from 'express';
import {authenticateToken} from '../middlewares/authentication.js';
import {
  getEntries,
  getEntryById,
  postEntry,
  getEntriesByUserId,
  putEntry,
  deleteEntry,
  getMyEntries,
} from '../controllers/entry-controller.js';

const entryRouter = express.Router();

entryRouter.get('/me', authenticateToken, getMyEntries);

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(authenticateToken, postEntry);

entryRouter.get('/user/:id', authenticateToken, getEntriesByUserId);

entryRouter
  .route('/:id')
  .put(authenticateToken, putEntry)
  .delete(authenticateToken, deleteEntry)
  .get(authenticateToken, getEntryById); // suositus: suojaa myös yksittäinen haku

export default entryRouter;
