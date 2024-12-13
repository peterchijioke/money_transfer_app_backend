import { transactionDAO } from '../dao/transaction.dao';
import { ravenService } from './raven.service';
import axios from 'axios';
import { Transaction } from '../types/transaction.types';

class TransactionService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = process.env.WEB_HOOK || 'https://webhook.site/1b350e5e-6a4d-42e7-be17-b3a8f0b2b37b';
  }

async sendMoney(
 data:{amount: string, 
  bank_code: string, 
  bank: string, 
  account_number: string,
  account_name: string, 
  narration: string, 
  reference: string, 
  currency: string, 
  userId: number} 
): Promise<any> {
  try {
    const {
  amount,
  bank_code,
  bank,
  account_number,
  account_name: string, 
  narration, 
  reference,
  currency, 
  userId: number}=data
const {userId,...rest} = data;
    const transferResponse = await ravenService.initiateTransfer({...rest});
     if (transferResponse.status === 'fail') {
      console.error('Transfer failed:', transferResponse.message);
       return {
        status: 'fail',
        message: transferResponse.message || 'Unknown error',
      };
    }
    const transaction:any = {
      user_id: userId,
      type: 'transfer',
      amount,
      status: transferResponse.status === 'successful' ? 'completed' : 'pending', 
      reference: transferResponse.trx_ref,
      metadata: {
        bank,
        account_number,
        narration: transferResponse.meta?.narration,  
      },
      merchant_ref: transferResponse.merchant_ref,
      trx_ref: transferResponse.trx_ref,
      account_name: transferResponse.meta?.account_name,  
      account_number, 
      currency: transferResponse.meta?.currency || 'NGN', 
      response: transferResponse.response,  
    };


    await transactionDAO.insertTransaction(transaction);

    await this.notifyWebhook(transaction);

    return transferResponse;
  } catch (error) {
    console.error('Error in sendMoney:', error);
    throw error;
  }
}

  async getTransactionHistory(userId: number): Promise<Transaction[]> {
    return transactionDAO.getTransactionsByUserId(userId);
  }


  private async notifyWebhook(data: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    try {
      const response = await axios.post(this.webhookUrl, data);
      console.log('Webhook notification sent successfully:', response.data);
    } catch (error: any) {
      console.error('Error sending webhook notification:', error.message);
    }
  }
}

export const transactionService = new TransactionService();
