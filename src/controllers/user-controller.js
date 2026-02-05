//import users from '../models/user-model.js';
// HUOM: mokkidata on poistettu modelista

import {findUserByUsername} from '../models/user-model.js';

// TODO: lisää tietokantafunktiot user modeliin ja käytä niitä täällä
const getUsers = (req, res) => {
  for (let i = 0; i < users.length; i++) {
    delete users[i].password;
  }
  res.json(users);
};

// Käyttäjän lisäys (rekisteröityminen)
const postNewUser = (pyynto, vastaus) => {
  const newUser = pyynto.body;
  // Uusilla käyttäjillä pitää olla kaikki vaaditut ominaisuudet tai palautetaan virhe
  // itse koodattu erittäin yksinkertainen syötteen validointi
  if (!(newUser.username && newUser.password && newUser.email)) {
    return vastaus.status(400).json({error: 'required fields missing'});
  }

  // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  //console.log('registering new user', newUser);
  const newId = users[users.length - 1].id + 1;
  // luodaan uusi objekti, joka sisältää id-ominaisuuden ja kaikki newUserObjektin
  // ominaisuudet ja lisätään users-taulukon loppuun
  users.push({id: newId, ...newUser});
  delete newUser.password;
  //console.log('users', users);
  vastaus.status(201).json({message: 'new user added', user_id: newId});
};

const getUserById = (req, res) => {
  console.log('getting user id:', req.params.id);
  const userFound = users.find((user) => user.id == req.params.id);
  if (userFound) {
    res.json(userFound);
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

const putUserById = (req, res) => {
  console.log('updating user', req.params.id);
  const userIndex = users.findIndex((user) => user.id == req.params.id);
  if (userIndex !== -1) {
    users[userIndex] = {...users[userIndex], ...req.body};
    res.json({message: 'user updated', user: users[userIndex]});
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

const deleteUserById = (req, res) => {
  const userDelete = users.find((user) => user.id == req.params.id);
  if (userDelete) {
    users.splice(users.indexOf(userDelete), 1);
    res.status(204).json({message: 'deleted user'});
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

// Tietokantaversio
const loginUser = async (req, res) => {
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

export {
  getUsers,
  postNewUser,
  getUserById,
  loginUser,
  putUserById,
  deleteUserById,
};
