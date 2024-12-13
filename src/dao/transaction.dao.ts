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
}

export const transactionDAO = new TransactionDAO();
