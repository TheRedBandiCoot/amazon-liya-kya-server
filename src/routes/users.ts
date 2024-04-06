import express from 'express';
import { newUser, getUser } from '../controllers/users.js';

const app = express.Router();

app.post('/new', newUser);
app.get('/:id', getUser);

export default app;
