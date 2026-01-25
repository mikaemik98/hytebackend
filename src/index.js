import express from 'express';
import {
  getItems,
  putItemById,
  getItemById,
  deleteItemById,
  postNewItem,
} from './items.js';
import {
  getUsers,
  postNewUser,
  getUserById,
  loginUser,
  putUserById,
  deleteUserById,
} from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// parsitaan json data pyynnostä ja lisätään request-objektiin
app.use(express.json());

// Tarjoillaan websivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// API ROOT
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// Get all items
app.get('/items', getItems);

// Get item based on id
app.get('/items/:id', getItemById);

// TODO: add PUT route for items (tehty)
app.put('/items/:id', putItemById);

// TODO: add DELETE route for items (tehty)
app.delete('/items/:id', deleteItemById);

// Add new item
app.post('/items', postNewItem);

// Get all users
app.get('/users', getUsers);

// Post a new user
app.post('/users', postNewUser);

app.put('/users/:id', putUserById);

app.get('/users/:id', getUserById);

app.post('/login', loginUser);

app.delete('/users/:id', deleteUserById);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
