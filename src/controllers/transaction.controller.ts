import { Request, Response, NextFunction } from 'express';
import { transactionService } from '../services/transaction.service';

class TransactionController {
  async sendMoney(req: Request, res: Response, next: NextFunction): Promise<any> {
    const userId = req.user?.id;
    const { recipientAccount, amount, bankCode } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const transferResponse = await transactionService.sendMoney(
        userId,
        recipientAccount,
        amount,
        bankCode
      );
      res.status(200).json({ message: 'Transfer successful', transferResponse });
    } catch (error) {
      next(error); 
    }
  }

  async getTransactionHistory(req: Request, res: Response, next: NextFunction): Promise<any> {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const transactions = await transactionService.getTransactionHistory(userId);
      res.status(200).json({ transactions });
    } catch (error) {
      next(error); 
    }
  }
}

export const transactionController = new TransactionController();
