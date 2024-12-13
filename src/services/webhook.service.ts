import { transactionDAO } from '../dao/transaction.dao';

class WebhookService {

  async processTransferStatus(
    trx_ref: string,
    status: string,
    meta: { account_name: string; account_number: string; amount: number; currency: string },
    response: string,
    secret: string
  ): Promise<void> {
    const expectedSecret = 'your_webhook_secret_key';

    if (secret !== expectedSecret) {
      throw new Error('Invalid webhook secret');
    }

    const transactionStatus = status === 'successful' ? 'completed' : 'failed';
    const transactionData = {
      account_name: meta.account_name,
      account_number: meta.account_number,
      amount: meta.amount,
      currency: meta.currency,
      response,
    };

    await transactionDAO.updateTransactionStatus(trx_ref, transactionStatus, transactionData);
  }
}

export const webhookService = new WebhookService();
