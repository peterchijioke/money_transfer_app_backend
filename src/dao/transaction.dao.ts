import knex from '../db/db';

class TransactionDAO {
  async insertTransaction(transaction: {
    user_id: number;
    type: string;
    amount: number;
    status: string;
    reference: string;
  }): Promise<void> {
    await knex('transactions').insert(transaction);
  }

  async getTransactionsByUserId(userId: number): Promise<any[]> {
    return knex('transactions').where({ user_id: userId });
  }

  async updateTransactionStatus(trx_ref: string, status: string, data: {
    account_name: string;
    account_number: string;
    amount: number;
    currency: string;
    response: string;
  }): Promise<void> {
    await knex('transactions')
      .where({ trx_ref })
      .update({
        status,
        account_name: data.account_name,
        account_number: data.account_number,
        amount: data.amount,
        currency: data.currency,
        response: data.response,
      });
  }
}

export const transactionDAO = new TransactionDAO();
