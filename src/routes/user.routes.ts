import express from 'express';
import { userController } from '../controllers/user.controller';
import {authenticate} from '../middlewares/auth.middleware';


const router = express.Router();

router.post('/generate-bank-account', authenticate, userController.generateBankAccount);
router.get('/user-details', authenticate, userController.getUserDetails);

export default router;
