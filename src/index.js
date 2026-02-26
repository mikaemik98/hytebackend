import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import itemRouter from './routes/item-router.js';
import userRouter from './routes/user-router.js';
import requestLogger from './middlewares/logger.js';
import entryRouter from './routes/entry-router.js';
import workoutRouter from './routes/workout-router.js';
import authRouter from './routes/auth-router.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// enable CORS requests
app.use(cors());

// parsitaan json data pyynnostä ja lisätään request-objektiin
app.use(express.json());

// Tarjoillaan websivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// Oma loggeri middleware, käytössä koko sevelluksen laajuisesti eli käsittelee kaikki http-pyynnöt
app.use(requestLogger);

// API ROOT
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// Dummy items resource
app.use('/api/items', itemRouter);

app.use('/api/auth', authRouter);

// User resource router for all /api/users routes
app.use('/api/users', userRouter);

//Diary entries resource router
app.use('/api/entries', entryRouter);

//workout entries resource router
app.use('/api/workouts', workoutRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
