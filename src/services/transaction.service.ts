import { transactionDAO } from '../dao/transaction.dao';
import { ravenService } from './raven.service';

class TransactionService {
  async sendMoney(
    userId: number,
    recipientAccount: string,
    amount: number,
    bankCode: string
  ): Promise<any> {
    const transferResponse = await ravenService.initiateTransfer(recipientAccount, amount, bankCode);

    await transactionDAO.insertTransaction({
      user_id: userId,
      type: 'transfer',
      amount,
      status: transferResponse.status,
      reference: transferResponse.reference,
    });

    return transferResponse;
  }

  async getTransactionHistory(userId: number): Promise<any[]> {
    return transactionDAO.getTransactionsByUserId(userId);
  }
}

export const transactionService = new TransactionService();
