import express from 'express';
import { getAllPass, getUserPass, newPass } from '../controllers/pass.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

app.post('/new', adminOnly, newPass);
app.get('/all', adminOnly, getAllPass);
app.get('/userPass', getUserPass);

export default app;
