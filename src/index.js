import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Dummy mock data (nollautuu aina, kun sovelluksen käynnistää uudelleen)
const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Banaani'},
  {id: 3, name: 'Persikka'},
];

// parsitaan json data pyynnostä ja lisätään request-objektiin
app.use(express.json());

// Tarjoillaan websivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// API ROOT
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get item based on id
app.get('/items/:id', (req, res) => {
  console.log('getting item id:', req.params.id);
  const itemFound = items.find((item) => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({message: 'item not found'});
  }
  //res.json(itemFound);
});

// TODO: add PUT route for items (tehty)
app.put('/items', (req, res) => {
  items.push(req.body);
  res.status(201).json({message: 'updated items'});
});

// TODO: add DELETE route for items (tehty)
app.delete('/items/:id', (req, res) => {
  const itemDelete = items.find((item) => item.id == req.params.id);
  if (itemDelete) {
    items.splice(items.indexOf(itemDelete), 1);
    res.status(204).json({message: 'deleted item'});
  } else {
    res.status(404).json({message: 'item not found'});
  }
});

// Add new item
app.post('/items', (req, res) => {
  //console.log('add item request body', req.body);
  // TODO: lisää id listaan lisättävälle objektille (tehty)
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json({message: 'new item added'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
