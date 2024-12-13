import express from 'express';
import { userController } from '../controllers/user.controller';
import {authenticate} from '../middlewares/auth.middleware';


const router = express.Router();

router.get('/', authenticate, userController.user);
router.get('/users', authenticate, userController.users);

router.post('/generate-bank-account', authenticate, userController.generateBankAccount);

export default router;
