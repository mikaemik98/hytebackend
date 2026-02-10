import express from 'express';
import {
  getEntries,
  getEntryById,
  postEntry,
  getEntriesByUserId,
} from '../controllers/entry-controller.js';

const entryRouter = express.Router();

entryRouter.route('/').get(getEntries).post(postEntry);

entryRouter.get('/user/:id', getEntriesByUserId);

entryRouter.route('/:id').get(getEntryById);

export default entryRouter;
