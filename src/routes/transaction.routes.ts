import express from 'express';
import { transactionController } from '../controllers/transaction.controller';
import {authenticate} from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/send-money', authenticate, transactionController.sendMoney);
router.get('/transaction-history', authenticate, transactionController.getTransactionHistory);

export default router;
