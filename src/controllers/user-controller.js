//import users from '../models/user-model.js';
// HUOM: mokkidata on poistettu modelista
//import tietokantafunktiot user-modelista
import bcrypt from 'bcryptjs';
import {
  createUser,
  deleteUser,
  findUserById,
  getAllUsers,
  updateUser,
} from '../models/user-model.js';
import {validationResult} from 'express-validator';

//GET all users
//Hakee kaikki käyttäjät teitokannasta
//palauttaa FE:lle JSON muodossa
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

//CREATE new user (rekisteröinti)
const postNewUser = async (req, res, next) => {
  try {
    //otetaan data frontendiltä
    const {username, password, email} = req.body;
    //tarkistaa, että kaikki kentät on annettu
    if (!username || !password || !email) {
      return res.status(400).json({
        error: 'required fields missing',
      });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error('Invalid or missing fields');
      error.status = 400;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //kutsutaan modelia, joka lisää käyttäjän tietokantaan
    const user_id = await createUser({
      username,
      email,
      password: hashedPassword,
    });

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

//GET user by id
//hakee käyttäjän ID:n perusteella
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

//Login
/* const loginUser = async (req, res) => {
  try {
    //otetaan username ja password frontendiltä
    const {username, password} = req.body;
    //etsitään käyttäjä tietokannasta username perusteella
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(404).json({
        error: 'user not found',
      });
    }
    // tarkistetaan salasana
    if (user.password !== password) {
      return res.status(403).json({
        error: 'invalid password',
      });
    }
    //poistetaan salasana ennen kuin lehetetään frontendille
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
}; */

//UPDATE user
const putUserById = async (req, res) => {
  try {
    const token_user_id = req.user.user_id;
    const user_id = Number(req.params.id);

    if (token_user_id !== user_id) {
      return res.status(403).json({message: 'forbidden'});
    }

    const affected = await updateUser(user_id, req.body);
    if (affected === 0) return res.status(404).json({error: 'user not found'});

    res.json({message: 'user updated'});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
};

//DELETE user
const deleteUserById = async (req, res) => {
  try {
    const token_user_id = req.user.user_id;
    const user_id = Number(req.params.id);

    if (token_user_id !== user_id) {
      return res.status(403).json({message: 'forbidden'});
    }

    const affected = await deleteUser(user_id);
    if (affected === 0) return res.status(404).json({error: 'user not found'});

    res.json({message: 'user deleted'});
  } catch (error) {
    res.status(500).json({error: error.message});
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

//exportit routerille
export {getUsers, postNewUser, getUserById, putUserById, deleteUserById};
