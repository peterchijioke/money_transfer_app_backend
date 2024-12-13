import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';

class UserController {
  async generateBankAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
     res.status(401).json({ message: 'Unauthorized' });
     return;
    }

    try {
      const bankAccount = await userService.generateBankAccount(userId);
      res.status(201).json({ message: 'Bank account generated', bankAccount });
    } catch (error) {
      next(error);
    }
  }

  async user(req: Request, res: Response, next: NextFunction): Promise<any> {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await userService.getUserDetails(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }
  async users(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await userService.getAll();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
