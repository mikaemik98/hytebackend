//import users from '../models/user-model.js';
// HUOM: mokkidata on poistettu modelista

import {
  createUser,
  deleteUser,
  findUserById,
  findUserByUsername,
  getAllUsers,
  updateUser,
} from '../models/user-model.js';

/*GET all users*/
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

/*CREATE new user (rekisteröinti)*/
const postNewUser = async (req, res) => {
  try {
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        error: 'required fields missing',
      });
    }

    const user_id = await createUser(req.body);

    res.status(201).json({
      message: 'user created',
      user_id,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/*GET user by id*/
const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: 'user not found',
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/*LOGIN*/
const loginUser = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(404).json({
        error: 'user not found',
      });
    }
    if (user.password !== password) {
      return res.status(403).json({
        error: 'invalid password',
      });
    }
    delete user.password;

    res.json({
      message: 'login succesful',
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/*UPDATE*/
const putUserById = async (req, res) => {
  try {
    const affected = await updateUser(req.params.id, req.body);

    if (affected === 0) {
      return res.status(404).json({
        error: 'user not found',
      });
    }

    res.json({
      message: 'user updated',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/*DELETE*/
const deleteUserById = async (req, res) => {
  try {
    const affected = await deleteUser(req.params.id);

    if (affected === 0) {
      return res.status(404).json({
        error: 'user not found',
      });
    }
    res.json({
      message: 'user deleted',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Tietokantaversio
/* const loginUser = async (req, res) => {
  const {username, password} = req.body;
  // haetaan käyttäjä-objekti käyttäjän nimen perusteella
  const user = await findUserByUsername(username);
  console.log('loginUser user from db', user);

  if (user) {
    if (user.password === password) {
      delete user.password;
      return res.json({message: 'login ok', user: user});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};
 */
export {
  getUsers,
  postNewUser,
  getUserById,
  loginUser,
  putUserById,
  deleteUserById,
};
