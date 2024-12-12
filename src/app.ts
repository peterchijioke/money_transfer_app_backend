import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './utils/error.util';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);
app.use(errorHandler);

export default app;
