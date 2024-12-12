import express, { Request } from 'express';
import authRoutes from './auth.routes';
import accountRoutes from './account.routes';
import transferRoutes from './transfer.routes';
import webhookRoutes from './webhook.routes';

const router = express.Router();

const initHandler = async (req: Request, res: { json: (arg0: { message: string; }) => void; }) => {
  res.json({
    message: 'Init route working'
  });
};

router.get('/',initHandler)

router.use('/auth', authRoutes);
router.use('/account', accountRoutes);
router.use('/transfer', transferRoutes);
router.use('/webhook', webhookRoutes);

export default router;
