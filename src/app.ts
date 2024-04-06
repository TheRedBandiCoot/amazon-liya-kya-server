import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { errorMiddleware } from './middlewares/error.js';
import { connectDB } from './utils/features.js';

import userRoutes from './routes/users.js';
import passRoutes from './routes/pass.js';

config({
  path: './.env'
});
//@ Testing...
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGODB_URI!;

connectDB(mongoURI);

const app = express();

app.use(express.json());
app.use(cors());

//@Routes

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/pass', passRoutes);

app.use(errorMiddleware);

app.listen(port, () => console.log(`listen: ${port}`));
