import express from 'express';
import {authController} from '../controllers/auth.controller';
import { SignupDto } from '../dto/sign.dto';
import { validateRequest } from '../middlewares/validation.middleware';
import { LoginDto } from '../dto/login.dto';

const router = express.Router();

router.post('/signup',validateRequest(SignupDto), authController.signup);
router.post('/login',validateRequest(LoginDto), authController.login);


export default router;
