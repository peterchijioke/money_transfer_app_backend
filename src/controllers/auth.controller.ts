import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { name, email, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    try {
      const user = await authService.registerUser(name, email, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email, password } = req.body;

    try {
      const token = await authService.authenticateUser(email, password);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}

export const authController = new AuthController();
