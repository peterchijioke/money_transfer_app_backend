import { transactionDAO } from '../dao/transaction.dao';
import { ravenService } from './raven.service';
import axios from 'axios';
import { Transaction } from '../types/transaction.types';
import { WEB_HOOK } from '../../config';

class TransactionService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = WEB_HOOK??"";
  }
async sendMoney(data: {
  amount: string,
  bank_code: string,
  bank: string,
  account_number: string,
  account_name: string,
  narration: string,
  reference: string,
  currency: string,
  userId: number
}): Promise<any> {
  try {
    const { userId, ...rest } = data;
    const amount = parseFloat(data.amount);

    if (isNaN(amount) || amount <= 0) {
      return {
        status: 'fail',
        message: 'Invalid amount provided',
      };
    }

    const response = await this.getBallance();
    if (response?.status === 'success') {
      const { data } = response;
      if (Array.isArray(data)) {
        const hasSufficientBalance = data.some(item => item.available_bal > amount);
        if (!hasSufficientBalance) {
          return {
            status: 'fail',
            message: 'You have insufficient balance',
          };
        }

        const transferResponse = await ravenService.initiateTransfer(rest);
        if (transferResponse.status === 'fail') {
          console.error('Transfer failed:', transferResponse.message);
          return {
            status: 'fail',
            message: transferResponse.message || 'Unknown error',
          };
        }

        const transaction: any = {
          user_id: userId,
          type: 'transfer',
          amount,
          status: transferResponse.status === 'successful' ? 'completed' : 'pending',
          reference: transferResponse.trx_ref,
          metadata: {
            bank: rest.bank,
            account_number: rest.account_number,
            narration: transferResponse.meta?.narration ?? rest.narration,
          },
          merchant_ref: transferResponse.merchant_ref,
          trx_ref: transferResponse.trx_ref,
          account_name: transferResponse.meta?.account_name ?? rest.account_name,
          currency: transferResponse.meta?.currency || 'NGN',
          response: transferResponse.response,
        };

        await transactionDAO.insertTransaction(transaction);
        await this.notifyWebhook(transaction);

        return transferResponse;
      }
    }

    return {
      status: 'fail',
      message: response.message ?? 'Failed to retrieve balance',
    };
  } catch (error:any) {
    console.error('Error in sendMoney:', error);
    throw new Error(`sendMoney failed: ${error.message}`);
  }
}


// deposit money

async depositMoney(
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
  try {
    const transactions = await transactionDAO.getTransactionsByUserId(userId);
    
    if (!transactions || transactions.length === 0) {
      return [];
    }
    return transactions;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return [];
  }
}

public getBallance =async():Promise<any>=>{

try {
  const response = await ravenService.getBalance()
  return response
  
} catch (error) {
  throw error
}
}
public getTransactions =async():Promise<any>=>{

try {
  const response = await ravenService.getTransactions();
  return response
} catch (error) {
  throw error
}  
}


public transactionsWebhook=async(data:any)=>{
  try {
      const response = await axios.post(this.webhookUrl, data);
      console.log('Webhook notification sent successfully:', response.data);
    } catch (error: any) {
      console.error('Error sending webhook notification:', error);
    }
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
