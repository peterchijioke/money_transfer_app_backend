import express from 'express';
import { generateBankAccount, getUserDetails } from '../controllers/account.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/generate', authenticate, generateBankAccount);
router.get('/details', authenticate, getUserDetails);

export default router;
