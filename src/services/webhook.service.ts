import axios from 'axios';
import { transactionDAO } from '../dao/transaction.dao';

class WebhookService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = process.env.WEB_HOOK || 'https://webhook.site/1b350e5e-6a4d-42e7-be17-b3a8f0b2b37b';
  }

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

    await this.notifyWebhook({
      trx_ref,
      status: transactionStatus,
      meta,
      response,
    });
  }


}

export const webhookService = new WebhookService();
