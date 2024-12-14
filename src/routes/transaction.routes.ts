import express from 'express';
import { transactionController } from '../controllers/transaction.controller';
import {authenticate} from '../middlewares/auth.middleware';
import {validateRequest} from '../middlewares/validation.middleware';
import {SendMoneyDTO} from '../dto/send-money.dto';

const router = express.Router();
router.get('/history', authenticate, transactionController.history);
router.post('/send-money',authenticate,validateRequest(SendMoneyDTO), transactionController.sendMoney);
router.get('/balance',authenticate, transactionController.balance);
router.get('/',authenticate, transactionController.transactions);
export default router;
