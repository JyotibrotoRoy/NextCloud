import express from 'express';
import cors from 'cors';
import mainRoutes from './routes/mainRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', mainRoutes);

export default app;
