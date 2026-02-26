import {
  findEntryById,
  addEntry,
  findEntriesByUserId,
  updateEntryByIdAndUser,
  deleteEntryByIdAndUser,
} from '../models/entry-model.js';

const getMyEntries = async (req, res) => {
  const userId = req.user.user_id;
  const entries = await findEntriesByUserId(userId);
  res.json(entries);
};

const getEntries = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const entries = await findEntriesByUserId(user_id);
    res.json(entries);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const getEntriesByUserId = async (req, res) => {
  try {
    const token_user_id = req.user.user_id;
    const requested_user_id = Number(req.params.id);

    if (token_user_id !== requested_user_id) {
      return res.status(403).json({message: 'forbidden'});
    }

    const entries = await findEntriesByUserId(requested_user_id);
    res.json(entries);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const postEntry = async (req, res) => {
  try {
    const user_id = req.user.user_id; //aina tokenista
    const {entry_date, mood, weight, sleep_hours, notes} = req.body;

    if (!entry_date) return res.sendStatus(400);

    //uusi entry-objekti, jossa user_id tulee tokenista
    const entry = {user_id, entry_date, mood, weight, sleep_hours, notes};

    if (!(mood || weight || sleep_hours || notes)) return res.sendStatus(400);

    const result = await addEntry(entry);

    if (result.entry_id) {
      return res.status(201).json({message: 'New entry added.', ...result});
    }
    return res.status(500).json(result);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const putEntry = async (req, res) => {
  try {
    const entry_id = req.params.id;
    const token_user_id = req.user.user_id;

    const affected = await updateEntryByIdAndUser(
      entry_id,
      token_user_id,
      req.body,
    );
    if (affected === 0) return res.status(403).json({message: 'forbidden'});
    res.json({message: 'entry updated'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const deleteEntry = async (req, res) => {
  try {
    const entry_id = req.params.id;
    const token_user_id = req.user.user_id;

    const affected = await deleteEntryByIdAndUser(entry_id, token_user_id);
    if (affected === 0) return res.status(403).json({message: 'forbidden'});
    res.json({message: 'entry deleted'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
  getEntriesByUserId,
  getMyEntries,
};
