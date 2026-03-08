///Diary entry -reitit: /api/entries (GET+POST), /api/entries/me, /api/entries/:id (GET/PUT/DELETE) tokenilla + validointi.

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
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(
    authenticateToken,
    body('entry_date', 'entry_date must be a valid date').isISO8601(),
    body('mood').optional({nullable: true}).trim().isLength({max: 50}),
    body('weight').optional({nullable: true}).isFloat({min: 30, max: 300}),
    body('sleep_hours').optional({nullable: true}).isFloat({min: 0, max: 24}),
    body('notes').optional({nullable: true}).trim().isLength({max: 500}),
    validationErrorHandler,
    postEntry,
  );

entryRouter.get('/me', authenticateToken, getMyEntries);

entryRouter.get('/user/:id', authenticateToken, getEntriesByUserId);

entryRouter
  .route('/:id')
  .put(authenticateToken, putEntry)
  .delete(authenticateToken, deleteEntry)
  .get(authenticateToken, getEntryById); // suositus: suojaa myös yksittäinen haku

export default entryRouter;
