import { transactionDAO } from '../dao/transaction.dao';
import { ravenService } from './raven.service';

class TransactionService {
  async sendMoney(
    userId: number,
    recipientAccount: string,
    amount: number,
    bankCode: string
  ): Promise<any> {
    try {
      const bank = await this.getBankNameFromAccount(recipientAccount); 

      const transferResponse = await ravenService.initiateTransfer(amount, bank, bankCode, 'NGN');

      await transactionDAO.insertTransaction({
        user_id: userId,
        type: 'transfer',
        amount,
        status: transferResponse.status,
        reference: transferResponse.reference,
      });

      return transferResponse;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionHistory(userId: number): Promise<any[]> {
    return transactionDAO.getTransactionsByUserId(userId);
  }
  private async getBankNameFromAccount(account: string): Promise<string> {
    return 'Access Bank'; 
  }
}

export const transactionService = new TransactionService();
