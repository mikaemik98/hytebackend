/**
 * Kirjautumislogiikka: hakee käyttäjän DB:stä, vertaa bcryptillä, luo JWT-tokenin, palauttaa user+token.
 *
 * Huom:
 * - Frontissa token tallennetaan localStorageen ja lähetetään Authorization-headerissa.
 * - Backissa req.user asetetaan authentication-middlewarellä (JWT).
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import {findUserByUsernameWithPassword} from '../models/user-model.js';

console.log('JWT_SECRET exists?', Boolean(process.env.JWT_SECRET));

const postLogin = async (req, res) => {
  try {
    const {username, password} = req.body;
    if (!username || !password) return res.sendStatus(400);

    //haetaan käyttäjä + password-hash
    const user = await findUserByUsernameWithPassword(username);
    if (!user) return res.sendStatus(401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.sendStatus(401);

    //älä palauta passwordia
    delete user.password;

    //token sisältää userin olennaiset tiedot
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'});

    res.json({message: 'login ok', user, token});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const getMe = async (req, res) => {
  //req.user tulee middlewareltä
  res.json({message: 'token ok', user: req.user});
};

export {postLogin, getMe};
