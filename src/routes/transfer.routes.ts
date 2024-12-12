import express from 'express';
import { sendMoney, getTransactionHistory } from '../controllers/transfer.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/send', authenticate, sendMoney);
router.get('/history', authenticate, getTransactionHistory);

export default router;
