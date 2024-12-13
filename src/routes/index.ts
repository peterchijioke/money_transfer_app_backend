import express, { Request } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import transactionRoutes from './transaction.routes';
import webhookRoutes from './webhook.routes';

const router = express.Router();

const initHandler = async (req: Request, res: { json: (arg0: { message: string; }) => void; }) => {
  res.json({
    message: 'Init route working'
  });
};

router.get('/',initHandler)

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/webhook', webhookRoutes);

export default router;
