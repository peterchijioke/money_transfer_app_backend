import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import accountRoutes from './routes/account.routes';
import transferRoutes from './routes/transfer.routes';
import webhookRoutes from './routes/webhook.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/webhook', webhookRoutes);

export default app;
