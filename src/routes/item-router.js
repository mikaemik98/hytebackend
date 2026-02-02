import express from 'express';
import {
  deleteItemById,
  getItemById,
  getItems,
  postNewItem,
  putItemById,
} from '../controllers/item-controller.js';

const itemRouter = express.Router();

// Get all items
itemRouter.route('/').get(getItems).post(postNewItem);

itemRouter
  // define sub route
  .route('/:id')
  // get item base on id
  .get(getItemById)
  // TODO: add PUT route for items (tehty)
  .put(putItemById)
  // TODO: add DELETE route for items (tehty)
  .delete(deleteItemById);

export default itemRouter;
