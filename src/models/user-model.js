///User-malli: SQL-funktiot (select/insert/update/delete).

import promisePool from '../utils/database.js';

//TODO: lisää modelit ja muokkaa kontrollerit reiteille:
/* GET /api/users - list all users
GET /api/users/:id - get user by id
POST /api/users - add a new user
 */

/* //Huom: virheenkäsittely puuttuu
const findUserByUsername = async (username) => {
  const sql = 'SELECT * FROM Users WHERE username = ?';
  const [rows] = await promisePool.execute(sql, [username]);
  return rows[0];
};
 */

//GET all users
//hakee kaikki käyttäjät tietokannasta
const getAllUsers = async () => {
  const [rows] = await promisePool.execute(
    'SELECT user_id, username, email, userl_level, created_at FROM users',
  );
  return rows;
};

//GET user by id
const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT user_id, username, email, userl_level, created_at FROM users WHERE user_id = ?',
    [id],
  );
  return rows[0];
};

//GET user by username
//käytetään loginissa
const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username],
  );
  return rows[0];
};

//CREATE new user
const createUser = async (user) => {
  const sql = `
    INSERT INTO users (username, password, email)
    VALUES (?, ?, ?)
  `;
  const [result] = await promisePool.execute(sql, [
    user.username,
    user.password,
    user.email,
  ]);
  //palauttaa uuden käyttäjän ID:n
  return result.insertId;
};

//UPDATE user
const updateUser = async (id, user) => {
  const sql = `
    UPDATE users
    SET username = ?, email = ?
    WHERE user_id = ?
  `;
  const [result] = await promisePool.execute(sql, [
    user.username,
    user.email,
    id,
  ]);
  return result.affectedRows;
};

const findUserByUsernameWithPassword = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT user_id, username, email, user_level, password FROM users WHERE username = ?',
    [username],
  );
  return rows[0];
};

//DELETE user
const deleteUser = async (id) => {
  const [result] = await promisePool.execute(
    'DELETE FROM users WHERE user_id = ?',
    [id],
  );
  return result.affectedRows;
};

export {
  getAllUsers,
  findUserById,
  findUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  findUserByUsernameWithPassword,
};
