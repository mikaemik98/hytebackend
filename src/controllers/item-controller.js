import items from '../models/item-model.js';

const getItems = (req, res) => {
  res.json(items);
};

const getItemById = (req, res) => {
  console.log('getting item id:', req.params.id);
  const itemFound = items.find((item) => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({message: 'item not found'});
  }
  //res.json(itemFound);
};

const putItemById = (req, res) => {
  console.log('updating item id:', req.params.id);
  const itemIndex = items.findIndex((item) => item.id == req.params.id);
  if (itemIndex !== -1) {
    items[itemIndex] = {...items[itemIndex], ...req.body};
    res.json({message: 'item updated', item: items[itemIndex]});
  } else {
    res.status(404).json({message: 'item not found'});
  }
};

const deleteItemById = (req, res) => {
  const itemDelete = items.find((item) => item.id == req.params.id);
  if (itemDelete) {
    items.splice(items.indexOf(itemDelete), 1);
    res.status(204).json({message: 'deleted item'});
  } else {
    res.status(404).json({message: 'item not found'});
  }
};

const postNewItem = (req, res) => {
  //name is mandatory property for new item
  if (!req.body.name) {
    return res.status(400).json({message: 'bad request'});
  }
  //console.log('add item request body', req.body);
  // TODO: lisää id listaan lisättävälle objektille (tehty)
  /*const newItem = {
    id: items.length + 1,
    name: req.body.name,
    };
    items.push(newItem);
    res.status(201).json({ message: 'new item added' });
    */

  //Esimerkki toisesta tavasta
  const newId =
    items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  const newItem = {id: newId, ...req.body};
  items.push(newItem);
  res.status(201).json({message: 'new item added', item: newItem});
};

export {getItems, getItemById, putItemById, deleteItemById, postNewItem};
