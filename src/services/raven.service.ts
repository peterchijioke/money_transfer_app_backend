import axios from 'axios';
import { RAVEN_API_KEY, RAVEN_BASE_URL } from '../../config';

class RavenService {
  private ravenClient;

  constructor() {
    this.ravenClient = axios.create({
      baseURL: RAVEN_BASE_URL,
      headers: {
        Authorization: `Bearer ${RAVEN_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Generate a unique bank account for the user.
   * @param userId - The user's ID.
   * @returns The generated bank account details.
   */
  public async generateUniqueBankAccount(userId: string) {
    try {
      const response = await this.ravenClient.post('/bank-accounts', {
        account_name: `User_${userId}`,
        currency: 'NGN',
      });
      return response.data;
    } catch (error: any) {
      console.error('Error generating unique bank account:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to generate unique bank account');
    }
  }

  /**
   * Initiate a money transfer to another bank account.
   * @param recipientAccount - The recipient's bank account number.
   * @param amount - The amount to transfer.
   * @param bankCode - The recipient's bank code.
   * @returns The transfer response details.
   */
  public async initiateTransfer(recipientAccount: string, amount: number, bankCode: string) {
    try {
      const response = await this.ravenClient.post('/transfers', {
        recipient_account: recipientAccount,
        amount,
        bank_code: bankCode,
        currency: 'NGN',
      });
      return response.data;
    } catch (error: any) {
      console.error('Error initiating transfer:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to initiate transfer');
    }
  }
}

export const ravenService = new RavenService();
